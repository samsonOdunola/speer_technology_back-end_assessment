const request = require('supertest');
const App = require('../app'); // Assuming your Express app is in app.js

describe('Test the root path', () => {
  test('It should respond with a JSON message', async () => {
    const response = await request(App).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({message: 'Hello, World!'});
  });
});
