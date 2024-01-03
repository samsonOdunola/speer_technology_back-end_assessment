# Speer Technology - Back-end Developer Assesment Task
This repository contains the source code for the solution to the speer technology back-end developer assessment task. 

## Table of Contents

- [Tasks](#tasks)
- [Stack/Technology](#stacktechnologypackages)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Initial Values](#Initial-Values)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Contributing](#contributing)

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
   git clone https://github.com/Lampnet-Technologies/Fudex-Backend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Fudex-Backend
   ```

3. Install the project dependencies:

   ```bash
   npm install
   ```

* **Database**

  - The mongodb noSQL database was used for this project. Each microservices are attached to their own database but they can still communicate with wach other.

* **How to run application**

  - Install dependencies:
    - Navigate to each service/Folder including the gateway folder.
    - Run the command "npm install" this will install all the dependencies needed for the project
  - Servers:
    The gateway server will be hosted locally on your [machine](http://localhost:4000) at port 4000. in order to start the the gateway server
    - Move into the gateway directory "/gateway"
    - Run the command "npm start" to start the server or "npm run dev" to start the server in dev mode
    - Once the gateway server is up and running, repaeat the same step for the other services i.e. Inventory, Product and suppliers
    - If you have done the above steps correctly, all four servers should be running independently.

* **Testing and Documentation**
  - Swagger Ui: The swagger UI interface contains a detailed documentation of all the API calls that can be madeon this project. This can be located by entering the [URL](http://localhost:4000/api-docs) into the browser of your URL.Please ensure all the servers are running before testing!.
