  /*  
    File Name: survey.js
    Group 2: 2BeOrNot2Be
    
     */

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

let passport = require('passport');


let surveyController = require('../controllers/survey');

//helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

/* GET Route for the Survey List Page - READ Operation */
router.get('/', surveyController.displaySurveyList);

/* GET Route for displaying the Add Page - CREATE Operation */
router.get('/add', requireAuth, surveyController.displayAddPage);

/* GET Route for displaying the Add Page (if the page is refreshed) - CREATE Operation */
router.get('/add/:type/:num/:expires', requireAuth, surveyController.displayAddPage);

/* POST Route for processing the Add Page - CREATE Operation */
router.post('/add/:type/:num/:expires', requireAuth, surveyController.processAddPage);

/* GET Route for displaying the Edit Page - UPDATE Operation */
router.get('/edit/:id', requireAuth, surveyController.displayEditPage);

/* POST Route for processing the Edit Page - UPDATE Operation */
router.post('/edit/:id', surveyController.processEditPage);

/* GET Route for displaying the View Page - UPDATE Operation */
router.get('/view/:id/:type/:numQuestions', surveyController.displayViewPage);

/* POST Route for processing the View Page - UPDATE Operation */
router.post('/view/:id/:type/:numQuestions', surveyController.processViewPage);

/* GET Route to perform Deleteion - DELETE Operation */
router.get('/delete/:id', requireAuth, surveyController.performDelete);

/* GET Route for the Results List Page - READ Operation */
router.get('/results/:id/:questions', surveyController.displayResults);

/* GET Route for the Expired Survey List Page - READ Operation */
router.get('/expired', surveyController.displayExpiredList);

/* GET Route for the Expired Results List Page - READ Operation */
router.get('/expiredResults/:id/:questions', surveyController.displayExpiredResults);

/* GET Route for displaying the Expired View Page - UPDATE Operation */
router.get('/expiredView/:id/:type/:numQuestions', surveyController.displayExpiredViewPage);
module.exports = router;