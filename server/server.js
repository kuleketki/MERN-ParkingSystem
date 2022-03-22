//import express from "express";
import app from './api/app.js';
//const app = express();
const port = 3002;
// import dotenv from 'dotenv';

// dotenv.config();

//const port = process.env.API_PORT;
console.log('Port : ' + port);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
