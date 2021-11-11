const { support } = require('jquery');
let mongoose = require('mongoose');

// create a model class
let surveyModel = mongoose.Schema({
    name: String,
    email: String,
    number: String
},
{
    collection: "survey"
});


module.exports = mongoose.model('Survey', surveyModel);