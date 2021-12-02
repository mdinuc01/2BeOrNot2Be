  /*  
    File Name: survey.js
    Group 2: 2BeOrNot2Be
    
     */

let express = require('express');
let router = express.router;
let mongoose = require('mongoose');
let jwt = require('jsonwebtoken'); 

// create a reference to the db model
let Survey = require('../models/survey');
let Answer = require('../models/answer');
const { NotImplemented } = require('http-errors');
const { double } = require('cli-boxes');

module.exports.displaySurveyList = (req, res, next) => {
    Survey.find((err, surveyList) => {
        if(err)
        {
            return console.error(err);    
        }
        if (!req.user){
            res.render('survey/list', 
        {title: 'Surveys', 
        surveyList: surveyList,
        displayName: req.user ? req.user.displayName : ''});
        }
        else{
            res.render('survey/list', 
        {title: 'Surveys', 
        surveyList: surveyList,
        id: req.user.id,
        displayName: req.user ? req.user.displayName : ''});
        }
        
    });
}

module.exports.displayAddPage = (req, res, next) => {
    if (!req.user){
    res.render('survey/add', 
    {title: 'Add Survey',
    displayName: req.user ? req.user.displayName : ''})
}
    else{
    res.render('survey/add', 
    {title: 'Add Survey',
    id: req.user.id,
    displayName: req.user ? req.user.displayName : ''})
}
}

module.exports.processAddPage = (req, res, next) => {
    let today = new Date(Date.now());
    
        var now = new Date();
        var expire = new Date();
        var num = req.params.expires;
        var numI = parseInt(num);
        
        expire.setDate(now.getDate() + numI);
        
    let newSurvey = Survey({
        "name": req.body.name,
        "ownedBy": req.user.id,
        "q1": req.body.q1,
        "q2": req.body.q2,
        "q3": req.body.q3,
        "q4": req.body.q4, 
        "q5": req.body.q5,
        "q6": req.body.q6,
        "q7": req.body.q7,
        "q8": req.body.q8,
        "q9": req.body.q9,
        "q10": req.body.q10,
        //question 1 options
        "q1A1": req.body.q1A1,
        "q1A2": req.body.q1A2,
        "q1A3": req.body.q1A3,
        "q1A4": req.body.q1A4,
        //question 2 options
        "q2A1": req.body.q2A1,
        "q2A2": req.body.q2A2,
        "q2A3": req.body.q2A3,
        "q2A4": req.body.q2A4,
        //question 3 options
        "q3A1": req.body.q3A1,
        "q3A2": req.body.q3A2,
        "q3A3": req.body.q3A3,
        "q3A4": req.body.q3A4, 
        //question 4 options
        "q4A1": req.body.q4A1,
        "q4A2": req.body.q4A2,
        "q4A3": req.body.q4A3,
        "q4A4": req.body.q4A4,     
        //question 5 options
        "q5A1": req.body.q5A1,
        "q5A2": req.body.q5A2,
        "q5A3": req.body.q5A3,
        "q5A4": req.body.q5A4,    
        //question 6 options
        "q6A1": req.body.q6A1,
        "q6A2": req.body.q6A2,
        "q6A3": req.body.q6A3,
        "q6A4": req.body.q6A4, 
        //question 7 options
        "q7A1": req.body.q7A1,
        "q7A2": req.body.q7A2,
        "q7A3": req.body.q7A3,
        "q7A4": req.body.q7A4,  
        //question 8 options
        "q8A1": req.body.q8A1,
        "q8A2": req.body.q8A2,
        "q8A3": req.body.q8A3,
        "q8A4": req.body.q8A4,     
        //question 9 options
        "q9A1": req.body.q9A1,
        "q9A2": req.body.q9A2,
        "q9A3": req.body.q9A3,
        "q9A4": req.body.q9A4,  
        //question 10 options
        "q10A1": req.body.q10A1,
        "q10A2": req.body.q10A2,
        "q10A3": req.body.q10A3,
        "q10A4": req.body.q10A4,
        "numQuestions": req.params.num, 
        "type": req.params.type,
        "createdAt": today,
        "expireAt": expire
    });

    Survey.create(newSurvey, (err) => {
        if(err)
            {
                console.log(err);
                res.end(err);
            }
            else
            {
                res.redirect('/survey-list');
            }
    });
}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Survey.findById(id, (err, surveyToEdit) => {
        if(err){
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('survey/edit', 
            {title: 'Edit Survey', 
            survey: surveyToEdit,
            id: req.user.id ? id:" ",
            displayName: req.user ? req.user.displayName : ''});
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;
    let expire;

    Survey.findById(id, (err, surveyToEdit) => {
        if(err){
            console.log(err);
            res.end(err);
        }
        else
        {
            if (!req.user){
                res.render('survey/view', 
                {title: 'Survey',
                survey: surveyToView,
                type: req.params.type,
                displayName: req.user ? req.user.displayName : ''})
            }
                else{
                
                expire = surveyToEdit.expireAt;
            }
        }

    let updatedSurvey = Survey({
        "_id" : id,
        "name": req.body.name,
        "q1": req.body.q1,
        "q2": req.body.q2,
        "q3": req.body.q3,
        "q4": req.body.q4, 
        "q5": req.body.q5,
        "q6": req.body.q6,
        "q7": req.body.q7,
        "q8": req.body.q8,
        "q9": req.body.q9,
        "q10": req.body.q10,
        //question 1 options
        "q1A1": req.body.q1A1,
        "q1A2": req.body.q1A2,
        "q1A3": req.body.q1A3,
        "q1A4": req.body.q1A4,
        //question 2 options
        "q2A1": req.body.q2A1,
        "q2A2": req.body.q2A2,
        "q2A3": req.body.q2A3,
        "q2A4": req.body.q2A4,
        //question 3 options
        "q3A1": req.body.q3A1,
        "q3A2": req.body.q3A2,
        "q3A3": req.body.q3A3,
        "q3A4": req.body.q3A4, 
        //question 4 options
        "q4A1": req.body.q4A1,
        "q4A2": req.body.q4A2,
        "q4A3": req.body.q4A3,
        "q4A4": req.body.q4A4,     
        //question 5 options
        "q5A1": req.body.q5A1,
        "q5A2": req.body.q5A2,
        "q5A3": req.body.q5A3,
        "q5A4": req.body.q5A4,    
        //question 6 options
        "q6A1": req.body.q6A1,
        "q6A2": req.body.q6A2,
        "q6A3": req.body.q6A3,
        "q6A4": req.body.q6A4, 
        //question 7 options
        "q7A1": req.body.q7A1,
        "q7A2": req.body.q7A2,
        "q7A3": req.body.q7A3,
        "q7A4": req.body.q7A4,  
        //question 8 options
        "q8A1": req.body.q8A1,
        "q8A2": req.body.q8A2,
        "q8A3": req.body.q8A3,
        "q8A4": req.body.q8A4,     
        //question 9 options
        "q9A1": req.body.q9A1,
        "q9A2": req.body.q9A2,
        "q9A3": req.body.q9A3,
        "q9A4": req.body.q9A4,  
        //question 10 options
        "q10A1": req.body.q10A1,
        "q10A2": req.body.q10A2,
        "q10A3": req.body.q10A3,
        "q10A4": req.body.q10A4,
        "expireAt": expire
        
    });



    Survey.updateOne({_id: id}, updatedSurvey, (err) => {
        if(err)
        {
            console.log(err);
            res.render(err);
        }
        else
        {
            //refresh the survey-list
            res.redirect('/survey-list');
        }
    });
});
}


module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Survey.deleteOne({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.render(err);
        }
        else
        {
            //refresh the survey-list
            res.redirect('/survey-list');
        }
    });
}

module.exports.displayViewPage = (req, res, next) => {
    let id = req.params.id;

    Survey.findById(id, (err, surveyToView) => {
        if(err){
            console.log(err);
            res.end(err);
        }
        else
        {
            if (!req.user){
                res.render('survey/view', 
                {title: 'Survey',
                survey: surveyToView,
                type: req.params.type,
                displayName: req.user ? req.user.displayName : ''})
            }
                else{
                res.render('survey/view', 
                {title: 'Survey',
                survey: surveyToView,
                type: req.params.type,
                name: surveyToView.name,
                id: req.user.id,
                displayName: req.user ? req.user.displayName : ''});
            }
            
        }
    });
}


module.exports.processViewPage = (req, res, next) => {
    let today = new Date(Date.now());
   if(req.params.type == 'SA'){
   
    let survey = req.params.id;
    let user;
    if(!req.user){
        user = "Unknown";
        
    } else{
        user = req.user.displayName; 
    }
    
    let newAnswer = Answer({
        "surveyId": survey,
        "a1": req.body.q1A1SAView,
        "a2": req.body.q2A1SAView,
        "a3": req.body.q3A1SAView,
        "a4": req.body.q4A1SAView,
        "a5": req.body.q5A1SAView,
        "a6": req.body.q6A1SAView,
        "a7": req.body.q7A1SAView,
        "a8": req.body.q8A1SAView,
        "a9": req.body.q9A1SAView,
        "a10":req.body.q10A1SAView,
        "answeredOn": today,
        "answeredBy": user, 
        "numQuestions": req.params.numQuestions
        
    });

    Answer.create(newAnswer, (err, Answer) => {
        if(err)
            {
                console.log(err);
                res.end(err);
            }
            else
            {
                res.redirect('/survey-list');
            }
    });

}

else if(req.params.type == 'MA'){
    
    let survey = req.params.id;
    let user;
    if(!req.user){
        user = "Unknown";
        
    } else{
        user = req.user.displayName; 
    }
    
    let newAnswer = Answer({
        "surveyId": survey,
        "a1": req.body.q1,
        "a2": req.body.q2,
        "a3": req.body.q3,
        "a4": req.body.q4,
        "a5": req.body.q5,
        "a6": req.body.q6,
        "a7": req.body.q7,
        "a8": req.body.q8,
        "a9": req.body.q9,
        "a10":req.body.q10,
        "answeredOn": Date.now(),
        "answeredBy": user,
        "numQuestions": req.params.numQuestions
        
    });

    Answer.create(newAnswer, (err, Answer) => {
        if(err)
            {
                console.log(err);
                res.end(err);
            }
            else
            {
                res.redirect('/survey-list');
            }
    });

}
}

module.exports.displayResults = (req, res, next) => {
   

    Answer.find((err, answers) => {
        if(err)
        {
            return console.error(err);    
        }
        if (!req.user){
            res.redirect('/survey-list');
        }
        else{
            let id = req.params.id
        Survey.findById(id, (err, surveyAnswered) => {
            if(err)
        {
            return console.error(err);    
        }
        if (!req.user){
            res.redirect('/survey-list');
        }
        else{
         res.render('survey/results', 
        {title: 'Results', 
        answerList: answers,
        id: id,
        surveyToView: surveyAnswered,
        surveyId: req.params.id,
        questions: req.params.questions,
        displayName: req.user ? req.user.displayName : ''});
    }
    })
   
        }
       
    });
}

module.exports.displayExpiredList = (req, res, next) => {
    Survey.find((err, surveyList) => {
        if(err)
        {
            return console.error(err);    
        }
        if (!req.user){
            res.redirect('/survey-list');
        }
        else{
            res.render('survey/expired', 
        {title: 'Expired Surveys', 
        surveyList: surveyList,
        id: req.user.id,
        displayName: req.user ? req.user.displayName : ''});
        }
        
    });
}

module.exports.displayExpiredResults = (req, res, next) => {
   

    Answer.find((err, answers) => {
        if(err)
        {
            return console.error(err);    
        }
        if (!req.user){
            res.redirect('/survey-list/expired');
        }
        else{
            let id = req.params.id
        Survey.findById(id, (err, surveyAnswered) => {
            if(err)
        {
            return console.error(err);    
        }
        if (!req.user){
            res.redirect('/survey-list/expired');
        }
        else{
         res.render('survey/resultsExpired', 
        {title: 'Expired Results', 
        answerList: answers,
        id: id,
        surveyToView: surveyAnswered,
        surveyId: req.params.id,
        questions: req.params.questions,
        displayName: req.user ? req.user.displayName : ''});
    }
    })
   
        }
       
    });
}

module.exports.displayExpiredViewPage = (req, res, next) => {
    let id = req.params.id;

    Survey.findById(id, (err, surveyToView) => {
        if(err){
            console.log(err);
            res.end(err);
        }
        else
        {
            if (!req.user){
                res.render('survey/view', 
                {title: 'Survey',
                survey: surveyToView,
                type: req.params.type,
                displayName: req.user ? req.user.displayName : ''})
            }
                else{
                res.render('survey/viewExpired', 
                {title: 'Expired Survey',
                survey: surveyToView,
                type: req.params.type,
                name: surveyToView.name,
                id: req.user.id,
                displayName: req.user ? req.user.displayName : ''});
            }
            
        }
    });
}