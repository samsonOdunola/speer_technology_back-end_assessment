const App = require("../../app");
const request = require("supertest");
const mongoose = require("mongoose");
const UserModel = require("../../models/user");
require("dotenv").config();
const testDb = process.env.TESTDB;
beforeAll(async () => {
  // Connect to a test database
  await mongoose.connect(`${testDb}`);
});

afterAll(async () => {
  // Disconnect from the test database after all tests
  await mongoose.connection.close();
});

describe("Auth Route Integration tests", () => {
  describe("POST auth/signup", () => {
    test("should create a new user and return with a status code of 201", async () => {
      const userData = {
        firstName: "test_fname",
        lastName: "test_lname",
        userName: "test_uname",
        password: "test_password",
        email: "test_email@yahoo.com",
      };
      const response = await request(App)
        .post("/api/auth/signup")
        .send(userData);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty("data");
      expect(response.body).toHaveProperty("message");
      expect(response.body.data.firstName).toBe(userData.firstName);

      // clean up database
      await UserModel.deleteOne({ email: userData.email });
    });
    test("response type should be application/json", async () => {
      // create test user
      const userData = {
        firstName: "test_fname",
        lastName: "test_lname",
        userName: "test_uname",
        password: "test_password",
        email: "test_email@yahoo.com",
      };
      const response = await request(App)
        .post("/api/auth/signup")
        .send(userData);
      // assertions
      expect(response.headers["content-type"]).toMatch(/application\/json/);
      // clean up database
      await UserModel.deleteOne({ email: userData.email });
    });
    test("should return a status code of 400 if any required parameter is not supplied", async () => {
      const userData = {
        firstName: "test_fname",
        lastName: "test_lname",
        userName: "test_uname",
        password: "test_password",
      };
      const response = await request(App)
        .post("/api/auth/signup")
        .send(userData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
    test("should return a response object with an error property if error occurs", async () => {
      const userData = {
        firstName: "test_fname",
        lastName: "test_lname",
        userName: "test_uname",
        password: "test_password",
      };
      const response = await request(App)
        .post("/api/auth/signup")
        .send(userData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty("error");
    });
  });
  describe("POST auth/login", () => {
    test("should authenticate user with a token after successfull login", async () => {
      // create test user
      const userData = {
        firstName: "test_fname",
        lastName: "test_lname",
        userName: "test_uname",
        password: "test_password",
        email: "test_email@yahoo.com",
      };
      const response = await request(App)
        .post("/api/auth/signup")
        .send(userData);
      // confirm test user got created
      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty("data");
      expect(response.body).toHaveProperty("message");
      expect(response.body.data.firstName).toBe(userData.firstName);

      // login test user
      const loginResponse = await request(App)
        .post("/api/auth/login")
        .send({ email: userData.email, password: userData.password });

      // assertions
      expect(loginResponse.status).toBe(200);
      expect(loginResponse.body.success).toBe(true);
      expect(loginResponse.body).toHaveProperty("data");
      expect(loginResponse.body).toHaveProperty("message");
      expect(loginResponse.body).toHaveProperty("token");

      // clean up database
      await UserModel.deleteOne({ email: userData.email });
    });

    test("should throw an error if password is not correct", async () => {
      // create test user
      const userData = {
        firstName: "test_fname",
        lastName: "test_lname",
        userName: "test_uname",
        password: "test_password",
        email: "test_email@yahoo.com",
      };
      const response = await request(App)
        .post("/api/auth/signup")
        .send(userData);
      // confirm test user got created
      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty("data");
      expect(response.body).toHaveProperty("message");
      expect(response.body.data.firstName).toBe(userData.firstName);

      // login test user
      const loginResponse = await request(App)
        .post("/api/auth/login")
        .send({ email: userData.email, password: "wrong_password" });

      // assertions
      expect(loginResponse.status).toBe(400);
      expect(loginResponse.body.success).toBe(false);
      expect(loginResponse.body).toHaveProperty("data");
      expect(loginResponse.body).toHaveProperty("message");
      expect(loginResponse.body).toHaveProperty("error");

      // clean up database
      await UserModel.deleteOne({ email: userData.email });
    });
    test("should return a status code 404 if user does not exist", async () => {
      // create test user
      const userData = {
        firstName: "test_fname",
        lastName: "test_lname",
        userName: "test_uname",
        password: "test_password",
        email: "test_email@yahoo.com",
      };
      const response = await request(App)
        .post("/api/auth/signup")
        .send(userData);
      // confirm test user got created
      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty("data");
      expect(response.body).toHaveProperty("message");
      expect(response.body.data.firstName).toBe(userData.firstName);

      // login test user
      const loginResponse = await request(App)
        .post("/api/auth/login")
        .send({ email: "unknown_email", password: userData.password });

      // assertions
      expect(loginResponse.status).toBe(404);
      expect(loginResponse.body.success).toBe(false);
      expect(loginResponse.body).toHaveProperty("data");
      expect(loginResponse.body).toHaveProperty("message");
      expect(loginResponse.body).toHaveProperty("error");

      // clean up database
      await UserModel.deleteOne({ email: userData.email });
    });
  });
});
