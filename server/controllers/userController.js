const bcrypt = require('bcrypt');
const { query } = require('../db.config.js');
const jwt = require('jsonwebtoken');

// Creation of user using PostgresSQL

const createUser = async (req, res, next) => {
  const { full_name, email, password } = req.body;
  console.log('in create user');
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

    const result = await query(
      'INSERT INTO users (full_name, email, password) VALUES ($1, $2, $3) RETURNING _id',
      [full_name, email, hashedPassword]
    );
    const userId = result.rows[0].id;

    console.log('user created successfully');
    res.locals.userId = userId;

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

const logout = (req, res, next) => {
  try {
    res.clearCookie('token');
    res.sendStatus(200);
  } catch (err) {
    console.log('Error', err);
    let error = {
      log: 'Express error handler caught userController.verifyUser',
      message: { err: err },
    };
    return next(error);
  }
};

module.exports = { createUser, verifyUser, logout };
