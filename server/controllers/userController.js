const bcrypt = require('bcrypt');
const { db, Users } = require('../db.config.js');
const { v4: uuidv4 } = require('uuid');

const createUser = async (req, res, next) => {
  const TableName = Users;
  const { fullName, email, password } = req.body;

  try {
    // Check if email already exists
    // const getResult = await db
    //   .get({
    //     TableName: TableName,
    //     Key: {
    //       email,
    //     },
    //   })
    //   .promise();
    const getResult = await new Promise((resolve, reject) => {
      db.get(
        {
          TableName: TableName,
          Key: {
            email,
          },
        },
        (err, data) => {
          if (err) reject(err);
          else resolve(data);
        }
      );
    });

    if (getResult.Item) {
      res.status(409).json({ message: 'Email already exists' });
      return;
    }

    // If email does not exist, create new user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const Item = {
      fullName,
      email,
      password: hashedPassword,
    };

    await db
      .put({
        TableName: TableName,
        Item: Item,
      })
      .promise();

    console.log('User created successfully');
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
  const { username, password } = req.body;
  const Key = { ['user_id']: username };
  console.log(username, password, TableName);

  try {
    await db
      .get({ TableName: TableName, Key: Key })
      .promise()
      .then((data) => {
        console.log(data);
        bcrypt.compare(password, data.Item.password, (err, isMatch) => {
          console.log('matched?', isMatch);
          if (err) {
            console.log('Error', err);
            let error = {
              log: 'Express error handler caught userController.verifyUser, bcrypt',
              message: { err: err },
            };
            return next(error);
          }
          return next();
        });
      });
    console.log('in try');
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

module.exports = { createUser, verifyUser };
