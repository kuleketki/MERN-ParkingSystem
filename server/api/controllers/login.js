import { response } from 'express';
import * as loginService from '../services/login.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/**
 * Showing Error message as response
 * @param {*} message
 * @param {*} status - status code
 * @param {*} response
 */
const setFailureResponse = (message, status, response) => {
  response.status(status);
  response.json({
    message: message,
  });
};

/**
 *  wing the success message with success JSON reposne
 * @param {*} data
 * @param {*} response
 */
const setSuccessResponse = (data, response) => {
  response.status(200);
  response.json(data);
};

export const validate = async (request, response) => {
  try {
    //get user input
    const user = { ...request.body };
    const password = user.password;
    const emailId = user.userid;
    console.log('Validate called ' + user);
    //validate user input
    if (!(emailId || password)) {
      response.status(400);
      response.json({ message: 'All fields are required' });
      return;
    }

    //check if userid already exists
    const validUser = await loginService.findByEmailId(emailId);

    if (validUser && (await bcrypt.compare(password, validUser.password))) {
      //create token
      const token = jwt.sign(
        {
          user_id: validUser._id,
          userid: emailId,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: '1h',
        }
      );

      //send success data
      const responseData = { token: token, id: validUser._id, userid: emailId };
      setSuccessResponse(responseData, response);
    } else {
      setFailureResponse('Invalid Credentials', 409, response);
    }
  } catch (e) {
    setFailureResponse(e.message, 500, response);
  }
};
