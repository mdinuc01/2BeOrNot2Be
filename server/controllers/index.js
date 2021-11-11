let express = require('express');
let route = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');


//create the User Model instance
let userModel = require('../models/user');
let User = userModel.User; //alias



module.exports.displayHomePage = (req, res, next) => {
    res.render('home_page.ejs', {title: 'Home', displayName: req.user ? req.user.displayName : ''});
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
            if (err)
            {
                return next(err);
            }
            return res.redirect('/survey-list');
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
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (err) => {
        if(err)
        {
            console.log("Error: Inserting New User");
            if(err.name == "UserExisitsError")
            {
                req.flash(
                    'registerMessage',
                    'Registeration Error: User Already Exists!'
                );
                console.log('Error: User Already Exists!')
            }
            return res.render('auth/register', 
            {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            });
        }
        else
        {
            // if no error exists, then registration is successful

            //redirect the user and authenticate them
            return passport.authenticate('local')(req, res, () => {
                res.redirect('/survey-list')
            });
        }
    });
}

module.exports.performLogout = (req, res, next) =>{
    req.logout();
    res.redirect('/');
}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.user.id;
    console.log(id);

    User.findById(id, (err, userToEdit) => {
        if(err){
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('auth/edit', 
            {title: 'Edit User', 
            users: userToEdit,
            id: id,
            displayName: req.user ? req.user.displayName : ''});
        }
    });
}

    module.exports.processEditPage = (req, res, next) => {
        let id = req.params.id
    
        let updatedUser = new User({
            "_id" : id,
            "username": req.body.username,
            "email": req.body.email,
            "displayName": req.body.displayName,
            "password": req.body.password
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

