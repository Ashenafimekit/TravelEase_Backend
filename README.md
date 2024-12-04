TravelEase Backend
Overview
The backend of TravelEase, a comprehensive bus ticket management system, is built with Node.js and Express.js. It provides a robust API for managing bus routes, bookings, user authentication, and administrative functionalities.

Features
User Authentication:
Login and registration with JSON Web Tokens (JWT) for secure access.
Role-based access control (Admin/User).
Bus Routes Management:
Add, edit, and delete bus routes.
Retrieve all routes or filter by criteria (departure, destination, date, etc.).
Booking Management:
Allow users to book tickets and view their bookings.
Admins can view all bookings.
Middleware:
Authentication middleware to protect API endpoints.
Admin-only access control for certain routes.
Tech Stack
Runtime: Node.js
Framework: Express.js
Database: MongoDB
Authentication: JSON Web Tokens (JWT)
