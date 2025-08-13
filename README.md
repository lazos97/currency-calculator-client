📄 Project Summary

This is a full-stack currency conversion application consisting of a Node.js + TypeScript backend API and a React frontend client, focusing on clean architecture, user authentication, and secure RESTful API communication.

🔧 Technologies Used Backend (API) – currency_calculator

Core: Node.js, Express, TypeScript, MongoDB (Mongoose)

Authentication & Security: JWT, bcrypt, Helmet, express-rate-limit

Environment Management: dotenv

Development Tools: ts-node, nodemon

Frontend (Client) – currency-calculator-client

Core: React, TypeScript

Routing: react-router-dom

👥 User Roles

There are two types of users:

Editor: Can add, remove, update, and view currencies, as well as perform conversions.

Viewer: Can only view currencies and perform conversions.

Default users:

Editor

Email: lazarosadmin@test.com

Password: 12345

Viewer

Email: user1@test.com

Password: 12345

Users can also register and create their own accounts.

💱 Functionality Overview

Secure user authentication (JWT-based)

Role-based access control

Real-time currency conversion

Admin dashboard for managing currencies (editor only)

Responsive UI built with React

🚀 Installation & Run

Install Dependencies (in both server and client folders) -npm install

Start Backend -npm start Runs on: http://localhost:5000

Start Frontend -npm start Runs on: http://localhost:3000

Create your own .env file

⚠️ For security reasons, the .env file used during development is not included. You must create your own .env file in the backend directory and provide your MongoDB connection URI and other environment variables such as the JWT secret.

Example:

PORT=5000 MONGO_URI=your_mongo_connection_string JWT_SECRET=your_jwt_secret

You can use a free MongoDB Atlas cluster or your local MongoDB instance.

🔗 API Communication The React frontend communicates with the backend via RESTful API endpoints under: http://localhost:5000/api/v1
