  /*  
    File Name: index.js
    Group 2: 2BeOrNot2Be
    
     */

let express = require('express');
let router = express.Router();


let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home',  indexController.displayHomePage);

/* GET Route for displaying the Login Page*/
router.get('/login', indexController.displayLoginPage);

/* POST Route for processing the Login Page*/
router.post('/login', indexController.processLoginPage);

/* GET Route for displaying the Register Page*/
router.get('/register', indexController.displayRegisterPage);

/* POST Route for processing the Register Page*/
router.post('/register', indexController.processRegisterPage);

/* GET Route for displaying the Login Page after registering*/
router.get('/reg_success', indexController.displayRegSuccessPage);

/* POST Route for processing the Login Page after registering*/
router.post('/reg_success', indexController.processLoginPage);

/* GET Route to perform User Logout*/
router.get('/logout', indexController.performLogout);

 // /* GET Route to perform edit User*/
router.get('/edit-user/:id', indexController.displayEditPage);

//* POST Route to perform edit user*/
router.post('/edit-user/:id', indexController.processEditPage);

 // /* GET Route to perform edit User*/
 router.get('/edit-user-pass/:id', indexController.displayEditPassPage);

 //* POST Route to perform edit user*/
 router.post('/edit-user-pass/:id', indexController.processEditPassPage);

module.exports = router;
