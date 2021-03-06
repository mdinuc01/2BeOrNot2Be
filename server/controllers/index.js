  /*  
    File Name: index.js
    Group 2: 2BeOrNot2Be
    
     */

let express = require('express');
let route = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// enable jwt
let jwt = require('jsonwebtoken');
let DB = require('../config/db');


//create the User Model instance
let userModel = require('../models/user');
let User = userModel.User; //alias

let Survey = require('../models/survey');



module.exports.displayHomePage = (req, res, next) => {
    if (!req.user){
    res.render('home_page.ejs', {
        title: 'Home', 
        displayName: req.user ? req.user.displayName : ''});
    }
    else{
        res.render('home_page.ejs', {title: 'Home', 
        id: req.user.id,
        displayName: req.user ? req.user.displayName : ''});
    }
};

module.exports.displayLoginPage = (req, res, next) => {
    if (!req.user)
    {
        res.render('auth/login',
        {
            title: 'Login',
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.userdisplayName: ''
        })
    }
    else
    {
         
        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
        if(err)
        {
            return next(err);
        }
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error' );
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            Survey.find((err, surveyList) => {
            if (err)
            {
                return next(err);
            }

            const payload = 
            {
                id: user._id,
                displayName: user.displayName,
                username: user.username,
                email: user.email
            }

            const authToken = jwt.sign(payload, DB.Secret,{
                expiresIn: 604800 // 1 week
            });
            
            // res.json({sucess: true, msg: 'User Logged in Successfully!', user: {
            //     id: user._id,
            //     displayName: user.displayName,
            //     username: user.username,
            //     email: user.email
            // }, token: authToken});
            

            return res.render('survey/list',
            {title: 'Surveys', 
            surveyList: surveyList,
            id: req.user.id,
            displayName: req.user ? req.user.displayName : ''});
            }
            )    
        }); 
    })(req, res, next);
}


module.exports.displayRegisterPage = (req, res, next) => {
    if(!req.user)
    {
        res.render('auth/register', 
        {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName: ''
        });
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req, res, next) =>{
    //instantiate a user object
    let newUser = new User({
        username: req.body.username, 
        email: req.body.email,
        displayName: req.body.name
    });

    User.register(newUser, req.body.newpassword2, (err) => {
        let error = false;
        if(err)
        {
            error = true;
            console.log("Error: Inserting New User");
            req.flash(
                'registerMessage',
                'Registeration Error: User Already Exists'
            );
            if(err.name == "UserExisitsError")
            {
                
                req.flash(
                    'registerMessage',
                    'Registeration Error: User Already Exists!'
                );
                console.log('Error: User Already Exists!')
            }
            else if (error){
                
            return res.render('auth/register', 
            {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            });
        }
        }
        else
        { 
                res.redirect('/reg_success')
           
        }
    });
}

module.exports.displayRegSuccessPage = (req, res, next) => {
    if (!req.user)
    {
        res.render('auth/reg_log',
        {
            title: 'Login',
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.userdisplayName: ''
        })
    }
    else
    {
         
        return res.redirect('/');
    }
}

module.exports.performLogout = (req, res, next) =>{
    req.logout();
    res.redirect('/');
}

module.exports.displayEditPage = (req, res, next) => {
 let id = req.user.id;

    User.findById(id, (err, userToEdit) => {
        if(err){
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('auth/editUser', 
            {title: 'Edit User Information', 
            user: userToEdit,
            id: req.user.id ? id:" ",
            displayName: req.user ? req.user.displayName : ''});
        }
    });
}

    module.exports.processEditPage = (req, res, next) => {
        let id = req.user.id;
    
        let updatedUser = new User({
            "_id" : id,
            username: req.body.username, 
            email: req.body.email,
            displayName: req.body.name, 
            created: req.user.created,
            update: Date.now()
            
        });
    
        User.updateOne({_id: id}, updatedUser, (err) => {
            if(err)
            {
                console.log(err);
               
            }
            else
            {
                //refresh the survey-list
                res.redirect('/survey-list');
            }
    });
    }

    module.exports.displayEditPassPage = (req, res, next) => {
        let id = req.user.id;
       
           User.findById(id, (err, userToEdit) => {
               if(err){
                   console.log(err);
                   res.end(err);
               }
               else
               {
                   //show the edit view
                   res.render('auth/editUserPass', 
                   {title: 'Change Password', 
                   user: userToEdit,
                   id: req.user.id ? id:" ",
                   displayName: req.user ? req.user.displayName : ''});
               }
           });
       }

    module.exports.processEditPassPage = (req, res, next) => {

        User.findOne({ id: req.user.id },(err, user) => {
            // Check if error connecting
            if (err) {
              res.json({ success: false, message: err }); // Return error
            } else {
              // Check if user was found in database
              if (!user) {
                console.log(err);
              } else {
                user.changePassword(req.body.oldpassword, req.body.newpassword, function(err) {
                   if(err) {
                    console.log(err);
                    res.render('auth/editUserPass', 
                   {title: 'Change Password', 
                   id: req.user.id,
                   message: 'Password is Incorrect, please and try again',
                   displayName: req.user ? req.user.displayName : ''});
                            }
                   else {
                    res.redirect('/survey-list')
                   }
                 })
              }
            }
          });  
         };

