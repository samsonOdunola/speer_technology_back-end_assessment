# Speer Technology - Back-end Developer Assesment Task
This repository contains the source code for the solution to the speer technology back-end developer assessment task. 

## Table of Contents

- [Tasks](#tasks)
- [Stack/Technology](#stacktechnologypackages)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Tasks:

1. Build a secure and scalable RESTful API
2. Allow for CRUD operations
3. Allow users to share notes with other users
4. Search for notes based on keywords

## stack/Technology/packages:

- **Expressjs**: This is a third party node js framework used for writing asynchronous code.
- **Node js**: This is the main platformm on which the application is built.  
- **MongoDb(cloud version)**: This is a noSQL database that stores information in documents.
- **jest**: This is package used for testing
- **supertest**: This is used alongside jest for testing
- **bycrypt**: This is a third party NPM package used to hash passwords before it is svaed to the database.
- **express-rate-limit**: This NPM package is used to impliment a simple rate limit for the server, it can be configured as desired.
- **jsonwebtoken**: This third pary package is used to authorise a user after a successfull login as well as to authenticate a user when a request is made to an API endpoint.
- **eslint**: This package is used to enforce a uniform styling when writing code.

## Prerequisites

Before setting up and running this application, make sure you have the following prerequisites installed on your system:

- [Node.js](https://nodejs.org/) (v12.0.0 or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager, latest version)

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/samsonOdunola/speer_technology_back-end_assessment.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Speer-Tech-back-end_assesment
   ```

3. Install the project dependencies:

   ```bash
   npm install
   ```

## Configuration

The configuration for the application is stored in the `config` directory. You should create a `.env` file in the root of the project and set the following environment variables:

```env
DBURL = connection string of mongoDb database
HOST = preffared host name or hos ip address
PORT = port on which application will be run
JWT_KEY = secret key for JWT
```

## Usage

To start the application, run the following command:

```bash
npm start
```

To start the application in development mode, run the following command:

```bash
npm run dev
```
To run unit tests for all the functions, run the following command:

```bash
npm run test
```

To see the coverage of test, run the following command:

```bash
npm run test:coverage
```

ON server start the server will start and listen on the port specified in your `.env` file (default is 3000).


## API Endpoints

The application provides the following API endpoints:

- **api/auth/login**:
  - POST: create a new user account.

- **/api/auth/login**:
  - POST: Log in to an existing user account and receive an access token. 

- **/api/notes**:
  - POST: reate a new note for the authenticated 
  
- **/api/notes/:id**:
  - GET: get a note by ID for the authenticated.
  - PUT: Update an existing note by ID for the authenticated user  
  - DELETE: delete a note by ID for the authenticated user. 

- **/api/notes/:id/share**:
  - POST: share a note with another user for the authenticated user.

- **/api/search?q=:query**:
  - GET: Search for notes based on keywords for the authenticated user  

## Testing

To run unit tests for all the functions, run the following command:

```bash
npm run test
```

To see the coverage of test, run the following command:

```bash
npm run test:coverage
```
