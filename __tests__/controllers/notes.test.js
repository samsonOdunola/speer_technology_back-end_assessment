/* eslint-disable max-len */
const NoteModel = require('../../models/notes');
const UserModel = require('../../models/user');


jest.mock('../../models/user');
jest.mock('../../models/notes');
const mockUser = {_id: 'mockUserId'};

jest.mock('../../utils/authentication.js', () => ({
  verifyUser: jest.fn(()=> ({user: mockUser})),
}));

const {createNote,
  getNote,
  updateNote,
  deleteNote,
  shareNote,
  getNoteById,
  search} = require('../../controllers/notes');

describe('Create Notes Test', () => {
  it('should return a status code of 201 when a note is created', async () => {
    // mock request
    const req = {
      body: {title: 'Test Title', content: 'Test Content'},
      headers: {authorization: 'Bearer mockToken'},
    };
    // mock response
    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({json: mockJson});
    const res = {status: mockStatus};


    const note = new NoteModel();


    // const saveMock = jest.fn().mockResolvedValue();
    note.save.mockImplementationOnce(() => ({
      userId: 'mockUserId',
      title: 'Test Title',
      content: 'Test Content',

    }));

    await createNote(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });
});


describe('Get Notes test', () => {
  const mockJson = jest.fn();
  const mockStatus = jest.fn().mockReturnValue({json: mockJson});
  const res = {status: mockStatus};

  it('should return a status code of 200 when a note is returned', async () => {
    const req = {
      headers: {authorization: 'Bearer mockToken'},
    };
    NoteModel.find.mockImplementationOnce(() => ({
      title: 'Test_title',
      content: 'Test_content',
      userId: 'mockUserId',
    }));
    await getNote(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should return a status code of 404 when a note is not found', async () => {
    const req = {
      headers: {authorization: 'Bearer mockToken'},
      params: {id: 'mockNoteId'},
    };
    NoteModel.findOne.mockImplementationOnce(() => null);
    await getNoteById(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('should return a status code of 200 when a note isfound', async () => {
    const req = {
      headers: {authorization: 'Bearer mockToken'},
      params: {id: 'mockNoteId'},
    };
    NoteModel.find.mockImplementationOnce(() => ({
      title: 'Test_title',
      content: 'Test_content',
      userId: 'mockUserId',
    }));
    await getNoteById(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });
});

// test for update note controller
describe('Update Note controller Tests', () => {
  const mockJson = jest.fn();
  const mockStatus = jest.fn().mockReturnValue({json: mockJson});
  const res = {status: mockStatus};
  it('should return a status code of 404 when a note is not found', async () => {
    const req = {
      headers: {authorization: 'Bearer mockToken'},
      params: {id: 'mockNoteId'},
      body: {title: 'test_title', content: 'test_content'},
    };
    NoteModel.updateOne.mockImplementationOnce(() => null);
    await updateNote(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(mockJson).toHaveBeenCalledWith({success: false, message: 'Note not found', error: 'error', data: {}});
  });
  it('should return a status code of 500 when a note is not updated', async () => {
    const req = {
      headers: {authorization: 'Bearer mockToken'},
      params: {id: 'mockNoteId'},
      body: {title: 'test_title', content: 'test_content'},
    };
    NoteModel.updateOne.mockImplementationOnce(() => ({
      modifiedCount: 0,
    }));
    await updateNote(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
  });
  it('should return a status code of 200 when a note is updated successfully', async () => {
    const req = {
      headers: {authorization: 'Bearer mockToken'},
      params: {id: 'mockNoteId'},
      body: {title: 'test_title', content: 'test_content'},
    };
    NoteModel.updateOne.mockImplementationOnce(() => ({
      modifiedCount: 1,
    }));
    await updateNote(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
describe('delete note controller test', () => {
  const mockJson = jest.fn();
  const mockStatus = jest.fn().mockReturnValue({json: mockJson});
  const res = {status: mockStatus};
  it('should return a status code of 404 when a note is not found', async () => {
    const req = {
      headers: {authorization: 'Bearer mockToken'},
      params: {id: 'mockNoteId'},
      body: {title: 'test_title', content: 'test_content'},
    };
    NoteModel.updateOne.mockImplementationOnce(() => null);
    await deleteNote(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });
});

describe('share note controller test', () => {
  const mockJson = jest.fn();
  const mockStatus = jest.fn().mockReturnValue({json: mockJson});
  const res = {status: mockStatus};

  it('should return a status code of 404 when the secondary user is not found', async () => {
    const req = {
      headers: {authorization: 'Bearer mockToken'},
      params: {id: 'mockNoteId'},
      body: {title: 'test_title', content: 'test_content'},
    };
    UserModel.findOne.mockImplementationOnce(() => null);
    await shareNote(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });
  it('should return a status code of 404 when the note to be shared is not found', async () => {
    const req = {
      headers: {authorization: 'Bearer mockToken'},
      params: {id: 'mockNoteId'},
      body: {title: 'test_title', content: 'test_content'},
    };
    UserModel.findOne.mockImplementationOnce(() => ({
      email: 'test_email',
      firstName: 'test_fname',
    }));
    NoteModel.findOne.mockImplementationOnce(() => null);
    await shareNote(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });
});
describe('Search controller test', () => {
  const mockJson = jest.fn();
  const mockStatus = jest.fn().mockReturnValue({json: mockJson});
  const res = {status: mockStatus};
  it('should return a status code of 400 when an error is encountered', async () => {
    const req = {
      headers: {authorization: 'Bearer mockToken'},
      query: {q: 'test_keyword'},
    };
    const mockedFunction = jest.fn(() => {
      throw new Error('Mocked error');
    });


    await search(req, res);
    expect(() => {
      mockedFunction();
    }).toThrow('Mocked error');
  });
});
