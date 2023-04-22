const bcrypt = require('bcrypt');
const { db, Users, query } = require('../db.config.js');

// Creation of user using DynamoDB (outdated)

// const createUser = async (req, res, next) => {
//   const TableName = Users;
//   const { fullName, email, password } = req.body;
//   console.log(fullName, email, password);

//   try {
//     // Check if email already exists
//     const getResult = await db.get({
//       TableName: TableName,
//       Key: {
//         email,
//       },
//     });
//     // no need to use promises for SDK v3
//     //   .promise();
//     // const getResult = await new Promise((resolve, reject) => {
//     //   db.get(
//     //     {
//     //       TableName: TableName,
//     //       Key: {
//     //         email,
//     //       },
//     //     },
//     //     (err, data) => {
//     //       if (err) reject(err);
//     //       else resolve(data);
//     //     }
//     //   );
//     // });

//     if (getResult.Item) {
//       return res.sendStatus(409);
//     }

//     // If email does not exist, create new user
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const Item = {
//       fullName,
//       email,
//       password: hashedPassword,
//     };

//     await db.put({
//       TableName: TableName,
//       Item: Item,
//     });
//     //   .promise();

//     console.log('User created successfully');
//     return next();
//   } catch (err) {
//     console.log('Error', err);
//     let error = {
//       log: 'Express error handler caught userController.createUser',
//       message: { err: err },
//     };
//     return next(error);
//   }
// };

// Creation of user using PostgresSQL

const createUser = async (req, res, next) => {
  const { full_name, email, password } = req.body;
  console.log(full_name, email, password);
  try {
    const getResult = await query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);
    if (getResult.rows.length > 0) {
      return res.sendStatus(409);
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await query(
      'INSERT INTO users (full_name, email, password) VALUES ($1,$2,$3)',
      [full_name, email, hashedPassword]
    );

    console.log('user created successfully');
    res.locals.userId = userData._id;

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

// Verification of user using DynamoDB (outdated)

// const verifyUser = async (req, res, next) => {
//   const TableName = Users;
//   const { email, password } = req.body;
//   const Key = { email };
//   console.log(email, password, TableName);

//   try {
//     const { Item: userData } = await db.get({ TableName, Key });

//     if (!userData) {
//       return res.sendStatus(401);
//     }

//     const isMatch = await bcrypt.compare(password, userData.password);
//     console.log('matched?', isMatch);

//     if (!isMatch) {
//       return res.sendStatus(401);
//     }

//     return next();
//   } catch (err) {
//     console.log('Error', err);
//     let error = {
//       log: 'Express error handler caught userController.verifyUser',
//       message: { err: err },
//     };
//     return next(error);
//   }
// };

const verifyUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const { rows } = await query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    if (rows.length === 0) {
      return res.sendStatus(401);
    }
    const userData = rows[0];
    console.log('user id is :', userData._id);
    console.log('userdata', userData);
    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) {
      return res.sendStatus(401);
    }
    res.locals.userId = userData._id;
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
