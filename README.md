# MERN Parking System

Welcome to the MERN Parking System, a full-stack web application developed using the MERN (MongoDB, Express.js, React, Node.js) stack. This system provides a user-friendly interface for managing parking spaces and reservations.

## Features

- **User Authentication:** Secure user authentication system for administrators and users.
- **Parking Space Management:** Add, remove, and update parking spaces, including details and availability.
- **Reservation System:** Users can make reservations for available parking spaces.
- **Dashboard:** User-friendly dashboards for both administrators and users.
- **Real-time Updates:** Get real-time updates on parking space availability.
- **Search and Filters:** Convenient search and filtering options for users.
- **Responsive Design:** Mobile-friendly and responsive UI for easy access from various devices.

## Technologies Used

This project incorporates various technologies and tools, including:

### APIs
- **Google Maps:** Integration of Google Maps for location-based features.
- **NodeMailer:** Sending email notifications and confirmations.
- **Razorpay:** Secure payment processing for reservations.

### Middleware
- **Multer:** Middleware for handling file uploads.
- **Thunk:** Middleware for handling asynchronous actions and dispatching functions.

### Database
- **MongoDB:** The project's database, used for efficient data storage and retrieval.

### Other
- **BcryptJs:** A library for hashing and securely storing user passwords.
- **JWT Tokens:** Implementation of JSON Web Tokens for user authentication.
- **Session Storage:** Storing session data for improved user experience.
- **dotenv:** A module for loading environment variables from a `.env` file.

These technologies, in addition to the MERN stack (MongoDB, Express.js, React, Node.js), work together to create a robust and feature-rich parking system.


## Setup

Follow these steps to set up and run the project:

1. **Clone the Repository:**

Run the following command in your shell:

```sh
https://github.com/kuleketki/MERNProject.git
```

2. **Install Dependencies:**

```sh
cd client && npm install
cd ../server && npm install
cd ..
npm install
````

3. **Configuration:**
- Create a `.env` file in the server directory and configure your MongoDB connection and other necessary environment variables.

4. **Start the Application:**

```sh
cd client && npm start
cd ../server && npm start
```
5. **Other Updates**
- Add .env file with below keys<br>
  TOKEN_KEY <br>
  MONGO_URI <br>
  PARKING_MAIL <br>

- Add config/keys.js file with below razorpay secrets<br>
  key_id<br>
  key_secret<br>
  Add a default export with payment_keys<br>

- Run 'npm install' on both server and client side<br>

- Start the server and client<br>


6. **Access the Application:**
- Open your browser and navigate to `http://localhost:3000` to view the application.

7. **Screenshots**
![image](https://github.com/kuleketki/MERNProject/assets/90637253/2ff287b6-23c3-4eb7-ac29-903b11caa950)
   
![image](https://github.com/kuleketki/MERNProject/assets/90637253/a9e93c9b-aeca-4fcb-8d07-5854bb35a91a)

![image](https://github.com/kuleketki/MERNProject/assets/90637253/a6368515-7c53-4706-a1c3-97770568dba1)

![image](https://github.com/kuleketki/MERNProject/assets/90637253/841dbc4e-fd28-495f-9d40-563c3b68ac91)









