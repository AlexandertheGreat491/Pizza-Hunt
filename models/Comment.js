//import statements
const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

//Reply schema
const ReplySchema = new Schema(
  {
    // set custom id to avoid confusion with parent comment _id
    replyId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    // data must exist in the replyBody field
    replyBody: {
      type: String,
      required: true,
      trim: true
    },
    // data must exist in the writtenBy field
    writtenBy: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
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

//Comment schema
const CommentSchema = new Schema(
  {
    // data must exist in the writtenBy field
    writtenBy: {
      type: String,
      required: true
    },
    // data must exist in the commentBody field
    commentBody: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    // use ReplySchema to validate data for a reply
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

CommentSchema.virtual('replyCount').get(function() {
  return this.replies.length;
});

const Comment = model('Comment', CommentSchema);

module.exports = Comment;
