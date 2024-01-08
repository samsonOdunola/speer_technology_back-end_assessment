const App = require("../../app");
const request = require("supertest");
const mongoose = require("mongoose");
const UserModel = require("../../models/user");
const NoteModel = require("../../models/notes");
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

describe("Notes Route Integration tests", () => {
  describe("POST notes/", () => {
    it("should return a status code of 201 when a new note is created", async () => {
      // create test user details
      const userData = {
        firstName: "test_fname",
        lastName: "test_lname",
        userName: "test_uname",
        password: "test_password",
        email: "test_email@yahoo.com",
      };
      const signUpresponse = await request(App)
        .post("/api/auth/signup")
        .send(userData);
      // ensure test user is created
      expect(signUpresponse.status).toBe(201);

      // log in test user
      const signinResponse = await request(App)
        .post("/api/auth/login")
        .send({ email: userData.email, password: userData.password });

      // ensure test user is signed in and token is retrieved

      expect(signinResponse.status).toBe(200);
      expect(signinResponse.body).toHaveProperty("token");

      // create test note

      const userNote = {
        title: "Test title",
        content: "Test content",
      };

      // create new note for authorised user

      const noteResponse = await request(App)
        .post("/api/notes")
        .set("Authorization", `Bearer ${signinResponse.body.token}`)
        .send(userNote);

      expect(noteResponse.status).toBe(201);
      expect(noteResponse.body.data.title).toBe(userNote.title);

      // clean up data base
      await UserModel.deleteOne({ email: userData.email });
      await NoteModel.deleteOne({ _id: noteResponse.body.data._id });
    });
    it("should return a status code of 401 if user is not authorised", async () => {
      // create test note

      const userNote = {
        title: "Test title",
        content: "Test content",
      };
      const noteResponse = await request(App)
        .post("/api/notes")

        .send(userNote);

      expect(noteResponse.status).toBe(401);
    });
    it("should throw an error and return a status code of 400 if note title is not provided", async () => {
      // create test note

      const userNote = {
        content: "Test content",
      };
      const noteResponse = await request(App)
        .post("/api/notes")

        .send(userNote);

      expect(noteResponse.status).toBe(401);
      expect(noteResponse.body).toHaveProperty("error");
    });
  });
  describe("GET notes/", () => {
    it("Response should contain an array of notes or an empty array if successfull", async () => {
      // create test user details
      const userData = {
        firstName: "test_fname",
        lastName: "test_lname",
        userName: "test_uname",
        password: "test_password",
        email: "test_email@yahoo.com",
      };
      const signUpresponse = await request(App)
        .post("/api/auth/signup")
        .send(userData);
      // ensure test user is created
      expect(signUpresponse.status).toBe(201);

      // log in test user
      const signinResponse = await request(App)
        .post("/api/auth/login")
        .send({ email: userData.email, password: userData.password });

      // ensure test user is signed in and token is retrieved

      expect(signinResponse.status).toBe(200);
      expect(signinResponse.body).toHaveProperty("token");

      // create test note

      const userNote = {
        title: "Test title",
        content: "Test content",
      };

      // create new note for authorised user

      const noteResponse = await request(App)
        .post("/api/notes")
        .set("Authorization", `Bearer ${signinResponse.body.token}`)
        .send(userNote);

      expect(noteResponse.status).toBe(201);
      expect(noteResponse.body.data.title).toBe(userNote.title);

      // main test
      const getNotesResponse = await request(App)
        .get("/api/notes")
        .set("Authorization", `Bearer ${signinResponse.body.token}`);

      // assertions
      expect(getNotesResponse.status).toBe(200);
      expect(getNotesResponse.body.data).toBeArray();

      // clean up data base
      await UserModel.deleteOne({ email: userData.email });
      await NoteModel.deleteOne({ _id: noteResponse.body.data._id });
    });
  });
});
