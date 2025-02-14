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

# Installation
- Clone the repository:

  ```
  git clone https://github.com/Dinesh3098/quiz-game-jumbo.git
  cd quiz-game-jumbo
  ```

- Install dependencies:

    ```
   npm install
    ```
- Set up environment variables:
Create a .env file in the root directory and add the following:

  ```
  MONGO_URL=your_mongo_db_connection_string
  SECRET_KEY=your_jwt_secret_key
  ```

- Run the server:
  ```
  npm start
  npm run dev( for nodemon server)
  ```

- API Endpoints
  * POST /api/auth/register: Registers a new user.
  * POST /api/auth/login: Authenticates a user.
  * POST /api/game/start: Starts a new game session.

- Real-Time Events
  * game:init: Initiate a new game session for matched players.
  * adduser: Add user to to connection queue
  * question:send: Send the next question to players.
  * answer:submit: Submit an answer for a question.
  * game:end: Notify players of the game result.
 
 # Project Structure

  ```
  /src
    /libs
      /mongoose
        index.js
    /models
      /gameSession
        index.js
        schema.js
        services.js
      /gameState
        index.js
        schema.js
        services.js
      /question
        index.js
        schema.js
        services.js
      /user
        index.js
        schema.js
        services.js
    /routes
      auth.js
      game.js
    /controllers
      authController.js
      gameController.js
    /sockets
      gameSocket.js
    /states
      gameState.js
      userState.js
    server.js
    .env

  ```

# Deployed server URL
  - https://quiz-game-jumbo.onrender.com

# API Documentation and Testing with Postman
  - This section provides details on the API endpoints available in the Real-Time Quiz Game project and instructions on how to test these endpoints using Postman.

- User Authentication
    * Register a New User
    * Endpoint: POST /api/auth/register
    * Description: Registers a new user.
    * Request Body
      ```
        {
        "email":"bhadanedinesh90@gmail.com",
        "password":"XXXXXXXXX"
        }
      ```

 - Response
     ```
         
    "status": "success",
    "msg": "Signed in sucessfully",
    "data": {
        "userId": "66681d269d796218f79a6d30",
        "token": ""
    }
      }
     ```
   - Login a User
      * Endpoint: POST /api/auth/login
      * Description: Authenticates a user and returns a JWT token.
      * Request Body:

      ```
        {
      "email":"bhadanedinesh90@gmail.com",
      "password":"XXXXX"
      }
      ```

      * Response
    
        ```
          {
        "status": "success",
        "msg": "Logged in successfully",
        "data": {
            "userId": "666759b1b99e3350fe05c91f",
            "token": "JWT Token"
        }
        }
        ```

   - Start a New Game Session
       * Endpoint: POST /api/game/start
       * Description: Starts a new game session and matches two players.
       * Headers:
        ```
            {
      "Authorization": "Bearer your_jwt_token"
          }

        ```
       * Response :
         ```
         {
            "status": "success",
            "msg": "Game started",
            "data": {
                "gameSessionId": "666811ffd80ee5ceecb3554e"
            }
        }
         ```

     # Socket.io Events
       - API URL: https://quiz-game-jumbo.onrender.com

         * Event : adduser
         * message : JSON
          ```
          {
            "userId":"666759b1b99e3350fe05c91f"
          }
          ```
         * Event : question:send
         * message : JSON

           ```
           {
              "gameId":"666811ffd80ee5ceecb3554e",
              "userId":"666759b1b99e3350fe05c91f",
              "questionIndex": 0
              // "answer":"D"
            }
           ```
           * Header: token : "token string"

           * Event : question:send
             
           * message : JSON
  
             ```
             {
                "gameId":"666811ffd80ee5ceecb3554e",
                "userId":"666759b1b99e3350fe05c91f",
                "questionIndex": 0
                // "answer":"D"
              }
             ```
             * Header: token : "token string"
