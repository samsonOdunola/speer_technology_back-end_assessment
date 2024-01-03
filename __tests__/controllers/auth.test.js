/* eslint-disable max-len */
const {signUp, signIn} = require('../../controllers/auth');

const UserModel = require('../../models/user');

jest.mock('../../models/user');
jest.mock('../../utils/authentication.js', () => ({
  signUser: jest.fn(()=> 'authorisation_token'),
}),
);
jest.mock('../../utils/hashPassword.js', () => ({
  comparePassword: jest.fn(() => true),
  hashPassword: jest.fn(() => 'hash'),
}));


describe('sign up controller tests', () => {
  const req = {
    body: {
      password: 'test_password',
      email: 'test_email',
      firstName: 'test_fname',
      lastName: 'test_lname',
      userName: 'test_uname',
    },
  };
  const mockJson = jest.fn();
  const mockStatus = jest.fn().mockReturnValue({json: mockJson});
  const res = {status: mockStatus};

  it('should return a status code of 201 when a user has signup successfully', async () => {
    await signUp(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });
});


describe('sign in controller tests', () => {
  const req = {
    body: {
      password: 'test_password',
      email: 'test_email',
    },
  };
  const mockJson = jest.fn();
  const mockStatus = jest.fn().mockReturnValue({json: mockJson});
  const res = {status: mockStatus};

  // tests
  it('should return a status code of 200 when user is logged in successfully', async () => {
    UserModel.findOne.mockImplementationOnce(() => ({
      _id: '24324243r53',
      firstName: 'test_name',
      lastname: 'test_lname',
      userName: 'test_uname',
      email: 'test_email',
      password: 'test_passwor',
    }));


    await signIn(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should return a token when a user is  logged in successfully', async () => {
    UserModel.findOne.mockImplementationOnce(() => ({
      _id: '24324243r53',
      firstName: 'test_name',
      lastname: 'test_lname',
      userName: 'test_uname',
      email: 'test_email',
      password: 'test_passwor',
    }));


    await signIn(req, res);


    expect(mockJson).toHaveBeenCalledWith({success: true, data: {
      _id: '24324243r53',
      firstName: 'test_name',
      lastname: 'test_lname',
      userName: 'test_uname',
      email: 'test_email',
      password: 'test_passwor',
    }, message: 'Login Successfull', token: 'authorisation_token'});
  });

  it('should return status code of 404 if user is not found', async () => {
    const req = {
      body: {
        password: 'test_password',
        email: 'test_email',
      },
    };
    UserModel.findOne.mockImplementation(() =>null);


    await signIn(req, res);


    expect(res.status).toHaveBeenCalledWith(404);
  });
});

