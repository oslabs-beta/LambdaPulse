const bcrypt = require('bcrypt');
const { db, Users } = require('../db.config.js');
const { v4: uuidv4 } = require('uuid');

const createUser = (req, res, next) => {
  //Set TableName
  const TableName = Users;
  //Pull in username and password from the body
  const { fullName, email, password } = req.body;
  //Bcrypt password
  let hashedPassword;
  bcrypt.genSalt(10, function (saltErr, salt) {
    if (saltErr) {
      console.log('Error', saltErr);
      let error = {
        log: 'Express error handler caught userController.createUser, saltError',
        message: { err: saltErr },
      };
      return next(error);
    } else {
      bcrypt.hash(password, salt, function (hashErr, hash) {
        if (hashErr) {
          console.log('Error', hashErr);
          let error = {
            log: 'Express error handler caught userController.createUser, hashError',
            message: { err: hashErr },
          };
          return next(error);
        } else {
          console.log('hash', hash);

          hashedPassword = hash;
          //// !!! user_id!!!!!
          const user_id = uuidv4();

          const Item = {
            user_id,
            fullName,
            email,
            password: hashedPassword,
          };
          console.log(fullName, email, password, TableName);

          try {
            db.put({ TableName: TableName, Item: Item }).promise();
            console.log('in try');
            return next();
          } catch (err) {
            console.log('Error', err);
            let error = {
              log: 'Express error handler caught userController.createUser',
              message: { err: err },
            };
            return next(error);
          }
        }
      });
    }
  });
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
