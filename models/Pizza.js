//imports the Schema constructor from the mongoose library
const { Schema, model } = require("mongoose")

//schema for the Pizza model

/*Contains:
Name of the pizza, name of the user that created the pizza,
timestamp of when the pizza was created, timestamp of any updates of the pizza's data, 
pizza's suggested size, & pizza's toppings. */

const PizzaSchema = newSchema({
    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    size: {
        type: String,
        default: 'Large'
    },
    toppings: []
});

//Pizza model

const Pizza = model('Pizza', PizzaSchema);

//exports the Pizza model
module.exports = Pizza;

