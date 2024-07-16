# TFC - Trybe Football Club ⚽

In this project, I created an informative application about football matches and standings, featuring a robust backend, API integrations, and Dockerized databases.

## Project Overview

TFC is a web application that provides information about football teams, matches, and standings. It was built with the following key features:

- Development of a Dockerized backend using Sequelize.
- Implementation of a RESTful API to provide data to the frontend.
- Integration of team, match, and standings data.
- Implementation of user authentication with tokens.
- Development of functionalities for updating and finalizing matches.

## Project Structure

Here is an overview of the project structure:

- `/app/backend`: Backend source code.
- `/app/frontend`: Frontend source code (not covered in this README).

## Technologies Used

- Node.js: For backend server development.
- Docker: For containerizing databases.
- Sequelize: For data modeling and interaction with the database.
- Express.js: For creating the RESTful API.
- JWT (JSON Web Tokens): For user authentication.
- Jest: For unit and integration testing.

## Running the Project

If you wish to run the project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/tfc.git`
2. Navigate to the backend folder: `cd tfc/app/backend`
3. Install dependencies: `npm install`
4. Start the server: `npm start`
5. You can now access the API at `http://localhost:3000`.

Make sure to properly configure environment variables and the database configuration file for the project to work locally.

## Learnings and Challenges

During the development of this project, I encountered and overcame several interesting challenges. Some of the key learnings include:

- Deep understanding of Sequelize and how to create models and migrations.
- Implementation of user authentication with JWT tokens.
- Integration of different parts of the project into a Docker Compose setup.
- Unit and integration testing to ensure code quality.
