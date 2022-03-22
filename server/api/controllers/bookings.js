import { response } from "express";
import * as bookingService from "../services/bookings.js";

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
    const bookings = await bookingService.search(request.query).then();
      setSuccessResponse(bookings, response);
    
  } catch (e) {
    errorhandler(e.message, response);
  }

  
};

export const save = async (request, response) => {
  try {
    const bookings = { ...request.body };
    const newbookings = await bookingService.create(bookings);
    setSuccessResponse(newbookings, response);
  } catch (e) {
    errorhandler(e.message, response);
  }
};

export const get = async (request, response) => {
  try {
    const id = request.params.id;
    const bookings = await bookingService.get(id);
    setSuccessResponse(bookings, response);
  } catch (e) {
    errorhandler(e.message, response);
  }
};

export const update = async (request, response) => {
  try {
    const id = request.params.id;
   request.body.lastModifiedDate = new Date();

   
    const bookings = {...request.body, id };
    const updatedbookings = await bookingService.update(bookings);
    setSuccessResponse(updatedbookings, response);
  } catch (e) {
    errorhandler(e.message, response);
  }
};

export const remove = async (request, response) => {
  try {
    const id = request.params.id;
    const bookings = await bookingService.remove(id);
    setSuccessResponse(bookings, response);
  } catch (e) {
    errorhandler(e.message, response);
  }
};
