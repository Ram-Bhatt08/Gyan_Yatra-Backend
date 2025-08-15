# Gyan Yatra - Backend

This repository contains the **backend code** for **Gyan Yatra**, a full-stack MERN (MongoDB, Express, React, Node.js) quiz game.  
Gyan Yatra is an interactive learning platform designed to make education fun and engaging through quizzes.

## 🚀 Features

- **User Authentication** – Secure login, registration, and token-based authentication.
- **Quiz Management** – Store, retrieve, and manage quiz questions from MongoDB.
- **Leaderboard System** – Track and display top scores.
- **RESTful API** – Clean and scalable API design for frontend integration.
- **Environment Config** – Securely manage credentials and secrets with `.env` file.

## 🛠 Tech Stack

- **Node.js** – Backend runtime environment.
- **Express.js** – Web application framework.
- **MongoDB** – NoSQL database.
- **Mongoose** – MongoDB object modeling.
- **dotenv** – Environment variable management.

## 📦 Installation & Setup

1. **Clone the repository**
   git clone https://github.com/Ram-Bhatt08/Gyan_Yatra-Backend.git <br>
   cd Gyan_Yatra-Backend

2. **Install dependencies**
    npm install

3. **Create .env file in the root folder and add:**
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key

4. **Seed the database (populate quiz questions)**
node seeder.js

5. **Run the server**
node server.js

**The backend should now be running at:**
http://localhost:5000

# 📂 Project Structure
Gyan_Yatra-Backend/ <br>
│── config/          # Database connection and configurations <br>
│── controllers/     # Business logic for routes <br>
│── data/            # Sample quiz data <br>
│── middleware/      # Authentication middleware <br>
│── models/          # Mongoose models <br>
│── routes/          # API route definitions <br>
│── seeder.js        # Data seeding script <br>
│── server.js        # Main server file <br>
│── .env             # Environment variables (not committed) <br>


# 🔗 Frontend

This is the backend repository. For full functionality, connect it with the Gyan Yatra - Frontend.

# 🎮 How It Works

User Authentication – Register/Login using JWT.

Fetch Quiz Data – API sends quiz questions from MongoDB.

Submit Answers – Backend calculates score and stores results.

Leaderboard – API fetches top scores for display on frontend.

# 🤝 Contributing

We welcome contributions!

Fork the repository

Create a feature branch (git checkout -b feature/AmazingFeature)

Commit changes (git commit -m 'Add some AmazingFeature')

Push to branch (git push origin feature/AmazingFeature)

Open a Pull Request

## 👨‍💻 Author

# Ram Bhatt

📧 Email: the.ram.bhatt@gmail.com <br>
🔗 Portfolio: <a href="https://the-ram-bhatt.vercel.app" target="_blank">the-ram-bhatt.vercel.app</a> <br>
💼 LinkedIn: <a href="https://www.linkedin.com/in/ram-bhatt-12390a253/" target="_blank">linkedin.com/in/ram-bhatt</a> <br>
🐙 Project Link: <a href="https://github.com/Ram-Bhatt08/Gyan_Yatra-Backend" target="_blank">Gyan_Yatra-Backend</a> <br>
