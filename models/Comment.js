// import code statement
const { Schema, model, Types } = require('mongoose');

// imports the dateFormat() function
const dateFormat = require('../utils/dateFormat');

// Reply schema
const ReplySchema = new Schema(
  {
    // sets a custom id to prevent confusion with the parent comment _id
    replyId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    replyBody: {
      type: String
    },
    writtenBy: {
      type: String
    },
    //creates timestamps for comments
    createdAt: {
      type: Data,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
  },
  {
    toJSON: {
      getters: true
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
  // creates timestamps for comments
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => dateFormat(createdAtVal)
  },
  // populates an array of data that follows the ReplySchema definition
  replies: [ReplySchema]
},
{
  toJSON: {
    virtuals: true, 
    getters: true
  },

  id: false
}
);

//replyCount virtual

CommentSchema.virtual('replyCount').get(function() {
  return this.replies.length;
});

const Comment = model('Comment', CommentSchema);

module.exports = Comment;
