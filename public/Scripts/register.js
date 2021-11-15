let username = document.getElementById("username");
let usernameError = document.getElementById("usernameError");
let password1 = document.getElementById("newpassword");
let password2 = document.getElementById("newpassword2");
let passwordError1 = document.getElementById("passwordError");
let oldPass = document.getElementById("oldpassword");
let error2 = document.getElementById("passwordError2");
let check = false;
let email = document.getElementById("email");
let emailError = document.getElementById("emailError");
let displayName = document.getElementById("name");
let nameError = document.getElementById("nameError");
let passBut = document.getElementById("passBut");
let userErrorCk = true;
let nameErrorCk = true;
let emailErrorCk = true;
let passErrorCk = true;
let emailCheck = /^[_\w\-]+(\.[_\w\-]+)*@[\w\-]+(\.[\w\-]+)*(\.[\D]{2,6})$/;

function validuser(){
        if(username.value === "") {
        usernameError.innerHTML = "Please fill in this field";
        usernameError.style.display = "block";
        username.style.background = "rgb(255,233,233)";
        usernameError.style.position = "relative";
        usernameError.style.left = "50%";
        userErrorCk = false;
    }
    else{
        username.style.background = "";
        usernameError.style.display = "none";
        usernameError.innerHTML = "";
        userErrorCk = true;
    }
}

function validName(){
    if(displayName.value === "") {
    nameError.innerHTML = "Please fill in this field";
    nameError.style.display = "block";
    displayName.style.background = "rgb(255,233,233)";
    nameError.style.position = "relative";
    nameError.style.left = "50%";
    nameErrorCk = false;
}
else{
    displayName.style.background = "";
    nameError.style.display = "none";
    nameError.innerHTML = "";
    nameErrorCk = true;
}
}

function validPassword(){

    try{

        if (/.{6,}/.test(password1.value) === false) {
            throw "Password must contain at least 6 Characters";
        } else if (password1.value.localeCompare(password2.value) !==0) {
            throw "Passwords must match";
        }   else if (/[A-Z]/.test(password1.value) === false) {
            throw "Password must have at least one upper-case Letter";
        } else if (/\d/.test(password1.value) === false) {
            throw "Password must contain one number";
        }
        password1.style.background = "";
        password2.style.background = "";
        passwordError1.style.display = "none";
        passwordError1.innerHTML = "";
        passErrorCk = true;
        
    } catch (msg) {
        passwordError1.style.display = "block";
        passwordError1.innerHTML = msg;
        password1.style.background =  "rgb(255,233,233)";
        password2.style.background =  "rgb(255,233,233)";
        passwordError1.style.left = "50%";
        passErrorCk = false; 
    }
}

function coverPass(){
    error2.style.display = "none";
}

function validEmail() {
    try {

        if (emailCheck.test(email.value) === false) {
            throw "Please enter a valid Email Address";
        }
        

    } catch (msg) {
        emailError.style.display = "block";
        emailError.innerHTML = msg;
        email.style.background = "rgb(255,233,233)";
        emailErrorCk = false;

    }
    if (email.value === "") {
        emailError.innerHTML = "Please fill in this field";
        emailError.style.display = "block";
        email.style.background = "rgb(255,233,233)";
        emailError.style.position = "relative";
        emailError.style.left = "50%";
        emailErrorCk = false;
    }
    else{
        emailErrorCk = true;
        email.style.background = "";
        emailError.style.display = "none";
        emailError.innerHTML = "";
    }
}

passBut.addEventListener('click', (event) =>{
    if(!emailErrorCk || !nameErrorCk || !userErrorCk || !passErrorCk)
    {
        event.preventDefault();
    }
});


function createEventListeners() {
    if (email.addEventListener) {
        email.addEventListener("blur", validEmail, false);
    } else if (email.attachEvent) {
        email.attachEvent("onchange", validEmail);
    }
    if (username.addEventListener) {
        username.addEventListener("blur", validuser, false);
    }   else if (username.attachEvent) {
        username.attachEvent("onchange", validuser);
    }

    if (displayName.addEventListener) {
        displayName.addEventListener("blur", validName, false);
    }   else if (displayName.attachEvent) {
        displayName.attachEvent("onchange", validName);
    }
    if (password2.addEventListener) {
        password2.addEventListener("blur", validPassword, false);
    }   else if (password2.attachEvent) {
        password2.attachEvent("onchange", validPassword);
    }
    if(oldPass == !null){
    if (oldPass.addEventListener) {
        oldPass.addEventListener("blur", coverPass, false);
    }   else if (oldPass.attachEvent) {
        oldPass.attachEvent("onchange", coverPass);
    }
}
    
}


function setupPage() {
    createEventListeners();
}



if (window.addEventListener) {
    window.addEventListener("load", setupPage, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", setupPage);
}
