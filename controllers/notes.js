/* eslint-disable no-underscore-dangle */
const NoteModel = require('../models/notes');
const UserModel = require('../models/user');
const response = require('../utils/response');
const {verifyUser} = require('../utils/authentication');

const createNote = async (req, res) => {
  let note;
  try {
    const {title, content} = req.body;
    const {authorization} = req.headers;

    const token = authorization.split(' ')[1];
    const userInfo = await verifyUser(token);
    const {user} = userInfo;

    note = new NoteModel({title, content, userId: user._id});

    await note.save();
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false,
      message: 'Error in creating note',
      error: err.message,
      data: {},
    });
  }
  return res.status(response.CREATED).json({
    success: true,
    message: 'Note created successfully',
    data: note,
  });
};

const getNote = async (req, res) => {
  let notes = [];
  try {
    const {authorization} = req.headers;

    const token = authorization.split(' ')[1];
    const userInfo = await verifyUser(token);
    const {user} = userInfo;

    notes = await NoteModel.find({
      $or: [{userId: user._id},
        {shares: user._id}],
    });
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false,
      message: 'Error in retrieving note',
      error: err.message,
      data: {},
    });
  }
  return res.status(response.OK).json({
    success: true,
    message: 'success',
    data: notes,
  });
};

const getNoteById = async (req, res) => {
  let note;
  try {
    const {authorization} = req.headers;
    const {id} = req.params;

    const token = authorization.split(' ')[1];
    const userInfo = await verifyUser(token);
    const {user} = userInfo;

    note = await NoteModel.findOne({userId: user._id, _id: id});


    if (!note) {
      return res.status(response.NOT_FOUND).json({success: false,
        message: 'Note not found',
        error: 'error',
        data: {}});
    }
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false,
      message: 'Error in retrieving note',
      error: err.message,
      data: {},
    });
  }
  return res.status(response.OK).json({
    success: true,
    message: 'success',
    data: note,
  });
};
const updateNote = async (req, res) => {
  let note;
  try {
    const {title, content} = req.body;
    const {authorization} = req.headers;
    const {id} = req.params;

    const token = authorization.split(' ')[1];
    const userInfo = await verifyUser(token);
    const {user} = userInfo;


    note = await NoteModel.updateOne({userId: user._id, _id: id},
        {title, content});


    if (!note) {
      return res.status(response.NOT_FOUND).json({success: false,
        message: 'Note not found',
        error: 'error',
        data: {}});
    }
    if (note.modifiedCount !== 1) {
      return res.status(response.INTERNAL_SERVER_ERROR).json({success: false,
        message: 'Error in updating note',
        error: 'error',
        data: {}});
    }
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false,
      message: 'Error in retrieving note',
      error: err.message,
      data: {},
    });
  }
  return res.status(response.OK).json({
    success: true,
    message: 'success',
    data: note,
  });
};
const deleteNote = async (req, res) => {
  let note;
  try {
    const {authorization} = req.headers;
    const {id} = req.params;

    const token = authorization.split(' ')[1];
    const userInfo = await verifyUser(token);
    const {user} = userInfo;

    note = await NoteModel.deleteOne({userId: user._id, _id: id});


    if (!note) {
      return res.status(response.NOT_FOUND).json({success: false,
        message: 'Note not found',
        error: 'error',
        data: {}});
    }
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false,
      message: 'Error in retrieving note',
      error: err.message,
      data: {},
    });
  }
  return res.status(response.OK).json({
    success: true,
    message: 'success',
    data: note,
  });
};
const shareNote = async (req, res) => {
  let note;
  try {
    const {email} = req.body;
    const {authorization} = req.headers;
    const {id} = req.params;
    // retrieve user to be shared with from database
    const secondaryUser = await UserModel.findOne({email});

    // confrim that user exists
    if (!secondaryUser) {
      return res.status(response.NOT_FOUND).json({
        success: 'false',
        message: 'user not found',
        data: {},
      });
    }

    // retrive authorised user details from token
    const token = authorization.split(' ')[1];
    const userInfo = await verifyUser(token);
    const {user} = userInfo;

    // retrieve details of note to be shared from db via note id
    note = await NoteModel.findOne({userId: user._id, _id: id});

    if (!note) {
      return res.status(response.NOT_FOUND).json({
        success: 'false',
        message: 'Note not found',
        data: {},
      });
    }
    // ensure that the note belogs to the user
    if ((user._id).toString() !== (note.userId).toString()) {
      return res.status(response.NOT_AUTHORIZED).json({
        success: 'false',
        message: 'You cannot share this file',
        data: {},
      });
    }
    // ensure user is not sharing note with itself
    if ((secondaryUser._id).toString() === (user._id).toString()) {
      return res.status(response.BAD_REQUEST).json({
        success: 'false',
        message: 'Cannot share note with your self',
        data: {},
      });
    }
    // check that the note has not been
    // previously shared with the secondary user
    if (note.shares.includes(secondaryUser._id)) {
      return res.status(response.BAD_REQUEST).json({
        success: 'false',
        message: 'Note has already being shared with user',
        data: {},
      });
    }

    // add seconday user id to the list of shares
    // for the note and save to database
    note.shares.push(secondaryUser._id);

    await note.save();
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false,
      message: 'Error sharing note',
      error: err.message,
      data: {},
    });
  }
  return res.status(response.OK).json({
    success: true,
    message: 'success',
    data: note,
  });
};
const search = async (req, res) => {
  let note;
  try {
    const {q} = req.query;
    const {authorization} = req.headers;

    const token = authorization.split(' ')[1];
    const userInfo = await verifyUser(token);
    const {user} = userInfo;

    note = await NoteModel.find({$text: {$search: q}, userId: user._id});
    if (!note) {
      return res.status(response.NOT_FOUND).json({
        success: 'false',
        message: 'Note not found',
        data: {},
      });
    }
  } catch (err) {

  }
  return res.status(response.OK).json({
    success: true,
    message: 'success',
    data: note,
  });
};


module.exports = {
  createNote,
  getNote,
  updateNote,
  deleteNote,
  shareNote,
  getNoteById,
  search,
};
