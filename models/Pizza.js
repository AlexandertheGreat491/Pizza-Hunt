//import statements
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const PizzaSchema = new Schema(
  {
    // data must exist in the pizzaName field
    pizzaName: {
      type: String,
      required: true,
      trim: true
    },
    // data must exist in the createdBy field
    createdBy: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    size: {
      type: String,
      default: 'Large'
    },
    toppings: [],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
);

// get total count of comments and replies on retrieval
// commentCount virtual

PizzaSchema.virtual('commentCount').get(function() {
  return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
})

/*As .reduce() walks through the array, passes accumulating total & current value of comment into function
and when the function returns it revises the total for the next iteration through 
the array.*/

const Pizza = model('Pizza', PizzaSchema);

module.exports = Pizza;
