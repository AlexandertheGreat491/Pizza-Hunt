const { Schema, model } = require('mongoose');

const PizzaSchema = new Schema({
  pizzaName: {
    type: String
  },
  createdBy: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  size: {
    type: String,
    default: 'Large'
  },
  comments: [
    {
      type: Schema.Types,ObjectId,
      ref: 'Comment'
    }
  ],
  toppings: []
});

const Pizza = model('Pizza', PizzaSchema);

//gets the total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function(){
  return this.comments.length;
});

module.exports = Pizza;
