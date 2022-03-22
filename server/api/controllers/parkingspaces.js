import { response } from 'express';
import * as parkingspacesService from '../services/parkingspace.js';

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

export const index = async (request, response) => {
  try {
    const parkingspace = await parkingspacesService
      .search(request.query)
      .then();
    console.log(parkingspace);

    setSuccessResponse(parkingspace, response);
  } catch (e) {
    errorhandler(e.message, response);
  }
};

export const save = async (request, response) => {
  try {
    const parkingspace = { ...request.body };
    parkingspace.parking_img = request.file.filename;
    parkingspace.coordinates = [parkingspace.longitude, parkingspace.latitude];

    const newparkingspace = await parkingspacesService.create(parkingspace);

    setSuccessResponse(newparkingspace, response);
  } catch (e) {
    errorhandler(e.message, response);
  }
};

export const get = async (request, response) => {
  try {
    const id = request.params.id;
    const parkingspace = await parkingspacesService.get(id);
    const fileName = './public/images/' + parkingspace.parking_img;
    console.log('filename' + fileName);
    //response.sendFile(path.join(__dirname, './uploads/image.png'));
    setSuccessResponse(parkingspace, response);
  } catch (e) {
    errorhandler(e.message, response);
  }
};

export const update = async (request, response) => {
  try {
    console.log(request.params);
    const id = request.params.id;
    request.body.lastModifiedDate = new Date();
    const parkingspace = { ...request.body, id };
    parkingspace.parking_img = request.file.filename;
    const updatedparkingspace = await parkingspacesService.update(parkingspace);
    setSuccessResponse(updatedparkingspace, response);
  } catch (e) {
    errorhandler(e.message, response);
  }
};

export const remove = async (request, response) => {
  try {
    const id = request.params.id;
    const parkingspace = await parkingspacesService.remove(id);
    setSuccessResponse(parkingspace, response);
  } catch (e) {
    errorhandler(e.message, response);
  }
};
