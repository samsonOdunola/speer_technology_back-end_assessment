const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserModel = require('./user');

const noteSchema = new Schema(
    {
      title: {
        type: String,
        required: true,
      },

      content: {
        type: String,
      },

      userId: {
        type: Schema.Types.ObjectId,
        ref: UserModel,
      },
      keywords: {
        type: String,
      },
      shares: [
        {
          type: Schema.Types.ObjectId,
          ref: UserModel,

        },
      ],

    },
    {timestamps: true},
);

noteSchema.index({title: 'text', content: 'text'});

noteSchema.pre('save', function(next) {
  const titleKeywords = this.title.toLowerCase().split(' ');
  const contentKeywords = this.content.toLowerCase().split(' ');

  // Combine and remove duplicates from title and content keywords
  const combinedKeywords = [...new Set([...titleKeywords, ...contentKeywords])];

  this.keywords = combinedKeywords.join(' ');

  next();
});


const noteModel = mongoose.model('notes', noteSchema);

module.exports = noteModel;
