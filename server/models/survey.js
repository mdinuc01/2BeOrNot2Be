  /*  
    File Name: survey.js
    Group 2: 2BeOrNot2Be
    
     */

const { support } = require('jquery');
let mongoose = require('mongoose');

// create a model class
let surveyModel = mongoose.Schema(
  
  {
    createdAt: Date,
    name: String,
    type: String, 
    ownedBy: String, 
    numQuestions: Number,
    q1: String,
    q2: String, 
    q3: String, 
    q4: String, 
    q5: String, 
    q6: String,
    q7: String,
    q8: String,
    q9: String,
    q10: String,
    //question 1 options
    q1A1: String,
    q1A2: String,
    q1A3: String,
    q1A4: String,
    //question 2 options
    q2A1: String,
    q2A2: String,
    q2A3: String,
    q2A4: String,
    //question 3 options
    q3A1: String,
    q3A2: String,
    q3A3: String,
    q3A4: String, 
    //question 4 options
    q4A1: String,
    q4A2: String,
    q4A3: String,
    q4A4: String,     
    //question 5 options
    q5A1: String,
    q5A2: String,
    q5A3: String,
    q5A4: String,    
    //question 6 options
    q6A1: String,
    q6A2: String,
    q6A3: String,
    q6A4: String, 
    //question 7 options
    q7A1: String,
    q7A2: String,
    q7A3: String,
    q7A4: String,  
    //question 8 options
    q8A1: String,
    q8A2: String,
    q8A3: String,
    q8A4: String,     
    //question 9 options
    q9A1: String,
    q9A2: String,
    q9A3: String,
    q9A4: String,  
    //question 10 options
    q10A1: String,
    q10A2: String,
    q10A3: String,
    q10A4: String,
    expireAt: {
      type: Date,
      default: Date.now,
    },
    
}, 
{
    collection: "survey"
}
);


module.exports = mongoose.model('Survey', surveyModel);

