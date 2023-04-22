const bcrypt = require('bcrypt');
const { db, Users } = require('../db.config.js');
const jwt = require("jsonwebtoken");

const createUser = async (req, res, next) => {
  const TableName = Users;
  const { fullName, email, password } = req.body;
  console.log(fullName, email, password);

  try {
    // Check if email already exists
    const getResult = await db.get({
      TableName: TableName,
      Key: {
        email,
      },
    });
    // no need to use promises for SDK v3
    //   .promise();
    // const getResult = await new Promise((resolve, reject) => {
    //   db.get(
    //     {
    //       TableName: TableName,
    //       Key: {
    //         email,
    //       },
    //     },
    //     (err, data) => {
    //       if (err) reject(err);
    //       else resolve(data);
    //     }
    //   );
    // });

    if (getResult.Item) {
      return res.sendStatus(409);
    }

    // If email does not exist, create new user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const Item = {
      fullName,
      email,
      password: hashedPassword,
    };

    await db.put({
      TableName: TableName,
      Item: Item,
    });
    //   .promise();

    console.log('User created successfully');
    res.locals.email = email;
    return next();
  } catch (err) {
    console.log('Error', err);
    let error = {
      log: 'Express error handler caught userController.createUser',
      message: { err: err },
    };
    return next(error);
  }
};

const verifyUser = async (req, res, next) => {
  const TableName = Users;
  const { email, password } = req.body;
  const Key = { email };
  console.log(email, password, TableName);

  try {
    const { Item: userData } = await db.get({ TableName, Key });

    if (!userData) {
      return res.sendStatus(401);
    }

    const isMatch = await bcrypt.compare(password, userData.password);
    console.log('matched?', isMatch);


    if (!isMatch) {
      return res.sendStatus(401);
    }
    res.locals.email = userData.email;
    return next();
  } catch (err) {
    console.log('Error', err);
    let error = {
      log: 'Express error handler caught userController.verifyUser',
      message: { err: err },
    };
    return next(error);
  }
};

const logout = (req,res,next) => {
  try {
    res.clearCookie("token");
    res.sendStatus(200);
  } catch(err) {
    console.log('Error', err);
    let error = {
      log: 'Express error handler caught userController.verifyUser',
      message: { err: err },
    };
    return next(error);
  }
}

module.exports = { createUser, verifyUser, logout };
