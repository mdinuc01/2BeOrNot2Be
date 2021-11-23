  /*  
    File Name: answer.js
    Group 2: 2BeOrNot2Be
    
     */

    const { support } = require('jquery');
    let mongoose = require('mongoose');
    
    // create a model class
    let answerModel = mongoose.Schema(
      
      {
        answeredOn: { type: Date, default: Date.now },
        surveyName: String,
        type: String,  
        numQuestions: Number,
        a1: String,
        a2: String, 
        a3: String, 
        a4: String, 
        a5: String, 
        a6: String,
        a7: String,
        a8: String,
        a9: String,
        a10: String,
    }, 
    {
        collection: "answer"
    }
    );
    
    
    module.exports = mongoose.model('Answer', answerModel);
    
    