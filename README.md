# Real-Time Quiz Game
This project is a real-time multiplayer quiz game built using Express.js, MongoDB, JWT for user authentication, and WebSockets for real-time communication. Players can register, log in, and participate in quiz games against each other. The game involves answering a set of pre-stored questions, and the player with the highest score at the end wins.

# Features
- User Authentication:
   * Register and log in users with secure password hashing.
   * JWT-based authentication for protected routes.
   
- Game Session Setup:
  * Start new game sessions and match two players.
  * Real-time game initiation using WebSockets.
    
- Question Management:
  * Pre-store a set of quiz questions in MongoDB.
  * Each question includes text, multiple choices, and the correct answer.
    
- Real-Time Question Delivery:
  * Deliver questions to players in real-time using WebSockets.
    
- Answer Submission and Scoring:
  * Submit answers in real-time and calculate scores.

- Result Calculation:
  * Calculate final scores after the game.
  * Determine and notify the winner.
 
- Tech Stack
    Backend: Express.js
    Database: MongoDB
    Authentication: JWT (JSON Web Tokens)
    Real-Time Communication: WebSockets (socket.io)

# Getting Started
  * Prerequisites
  * Node.js
  * MongoDB
