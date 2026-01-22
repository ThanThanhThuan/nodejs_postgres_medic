# Backend Summary for Medic Care App (Node.js + PostgreSQL)

This a RESTful API using Node.js and Express to handle appointment bookings and store them in a cloud-hosted PostgreSQL database (Render.com).
Credit for the template: https://templatemo.com/tm-566-medic-care
Watch live at : https://vue-medic-care.onrender.com/ 
Book an appointment, then click Admin to see results.

<img width="1448" height="1017" alt="image" src="https://github.com/user-attachments/assets/1558e63a-f76a-42b4-8d4d-808158f41023" />

Tech Stack

    Runtime: Node.js

    Framework: Express.js

    Database: PostgreSQL (via pg library)

    Utilities: cors (Cross-Origin Resource Sharing), dotenv (Environment variables)

Key Features

    Database Connection:

        Configured a Pool connection to Render.com.

        Crucial Fix: Added ssl: { rejectUnauthorized: false } to handle the SSL/TLS requirements of the cloud database.

    Database Schema:

        Created a table bookings with columns: id, name, email, phone, booking_date, message, and created_at.

    API Endpoints:

        POST /api/bookings: Receives JSON data from the frontend and inserts a new row into the database.

        GET /api/bookings: Retrieves all appointments (sorted by newest first) for the Admin Dashboard.

        GET /: Simple health check to confirm the server is running.

    Security & Config:

        Used .env to store sensitive credentials (DB_PASSWORD, DB_HOST).

        Created a .gitignore to prevent committing node_modules and .env.

Project Structure
code Text

server/
├── node_modules/
├── .env                 # Database credentials
├── .gitignore           # Ignored files
├── index.js             # Main server logic (Express + DB connection)
└── package.json         # Scripts: "start" and "dev"
