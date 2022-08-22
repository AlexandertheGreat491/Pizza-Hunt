// import code statement
const { Schema, model, Types } = require('mongoose');

// Reply schema
const ReplySchema = new Schema(
  {
    replyBody: {
      type: String
    },
    writtenBy: {
      type: String
    },
    createdAt: {
      type: Data,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
  }
);

// Comment schema
const CommentSchema = new Schema({
  writtenBy: {
    type: String
  },
  commentBody: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Comment = model('Comment', CommentSchema);

module.exports = Comment;
