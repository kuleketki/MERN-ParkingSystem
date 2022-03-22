import { response } from 'express';
import * as usersService from '../services/users.js';

import nodemailer from 'nodemailer';
import sendGridTransport from 'nodemailer-sendgrid-transport';
import SENDGRID_API from '../config/keys.js';

/**
 * Showing Error message as response
 * @param {*} message
 * @param {*} response
 */
const errorhandler = (message, response) => {
  response.status(500);
  response.json({ error: message });
};

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
  return;
};

/**
 *  wing the success message with success JSON reposne
 * @param {*} data
 * @param {*} response
 */
const setSuccessResponse = (data, response) => {
  response.status(200);
  response.json(data);
  return;
};

export const index = async (request, response) => {
  try {
    const users = await usersService.search().then();
    setSuccessResponse(users, response);
  } catch (e) {
    errorhandler(e.message, response);
  }
};

//creating a transport to send emails using sendgridtransport
const transporter = nodemailer.createTransport(sendGridTransport({
  auth:{
      api_key:SENDGRID_API
  }
}))

export const save = async (request, response) => {
  try {
    //got user input
    const user = { ...request.body };
    //console.log(user);
    const first_name = user.first_name;
    const last_name = user.last_name;
    const password = user.password;
    const userid = user.userid;
    console.log(user);
    //validate user input
    if (!userid || !password || !first_name || !last_name) {
      console.log('password' + password);
      response.status(400);
      response.json({ message: 'All fields are required' });
      return;
    }

    //check if userid always exist
    const oldUser = await usersService.findByEmailId(userid);
    console.log(oldUser);
    if (oldUser != null) {
      setFailureResponse(
        'User already exist.Please use a different email Id',
        409,
        response
      );
    } else {
      //new user with encrypted password and valid jwt token is created
      const newUser = await usersService.create(user);

    //Sending email using transporter
    transporter.sendMail({
        to: userid,
        from: process.env.PARKING_MAIL,
        subject:'Welcome to Parking 6150',
        name:'Parking!',
        text:`Welcome to Parking 6150 ${first_name} ${last_name}, Please use the portal to the fullest!`,
        html:`<h3>Welcome to Parking6150 ${first_name} ${last_name}</h3>
        <p>Please use the portal to the fullest!</p>`
    }).then(response => {
      response.json({response})
    })
    .catch(err => {
        console.log(err)
    })

      //newUser contains only id and token
      setSuccessResponse(newUser, response);
    }
  } catch (e) {
    errorhandler(e.message, response);
  }
};

export const get = async (request, response) => {
  try {
    const id = request.params.id;
    const user = await usersService.get(id);
    setSuccessResponse(user, response);
  } catch (e) {
    errorhandler(e.message, response);
  }
};

export const update = async (request, response) => {
  try {
    const id = request.params.id;
    request.body.lastModifiedDate = new Date();

    const user = { ...request.body, id };
    const updatedUser = await usersService.update(user);
    setSuccessResponse(updatedUser, response);
  } catch (e) {
    errorhandler(e.message, response);
  }
};

export const remove = async (request, response) => {
  try {
    const id = request.params.id;
    const user = await usersService.remove(id);
    setSuccessResponse(user, response);
  } catch (e) {
    errorhandler(e.message, response);
  }
};
