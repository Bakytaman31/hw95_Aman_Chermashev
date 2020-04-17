const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CocktailSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    image: {
        type: String,
        required: true
    },
    recipe: {
        type: String,
        required: true
    },
    published: {
        type: Boolean,
        default: false
    },
    ingredients: {
        type: Array,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

CocktailSchema.methods.publish = function () {
    return this.published = true;
};

const Cocktail = mongoose.model('Cocktail', CocktailSchema);

module.exports = Cocktail;