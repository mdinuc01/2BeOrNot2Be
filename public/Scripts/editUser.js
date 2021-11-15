let username = document.getElementById("username");
let nameDis = document.getElementById("name");
let nameError = document.getElementById("nameError");
let usernameError = document.getElementById("usernameError");
let email = document.getElementById("email");
let emailError = document.getElementById("emailError");
let updateBut = document.getElementById("updateBut");
let userErrorCk = true;
let nameErrorCk = true;
let emailErrorCk = true;
let emailCheck = /^[_\w\-]+(\.[_\w\-]+)*@[\w\-]+(\.[\w\-]+)*(\.[\D]{2,6})$/;

function usernameValid(){
    username.style.background = "";
    usernameError.style.display = "none";
    usernameError.innerHTML = "";
    

    if (username.value === "") {
        usernameError.innerHTML = "Please Fill in this field";
        usernameError.style.display = "block";
        username.style.background = "rgb(255,233,233)";
        usernameError.style.position = "relative";
        usernameError.style.left = "200px";
        userErrorCk = false;
        console.log(userErrorCk);
        
    }   else {
        userErrorCk = true;
        username.style.background = "";
        usernameError.style.display = "none";
        usernameError.innerHTML = "";
        console.log(userErrorCk);
        
    }
}

function nameValid(){
    nameDis.style.background = "";
    nameError.style.display = "none";
    nameError.innerHTML = "";
    

    if (nameDis.value === "") {
        nameError.innerHTML = "Please Fill in this field";
        nameError.style.display = "block";
        nameDis.style.background = "rgb(255,233,233)";
        nameError.style.position = "relative";
        nameError.style.left = "200px";
        nameErrorCk = false;
        console.log(nameemailErrorCk);
        
    }   else {
        nameErrorCk = true;
        console.log(nameemailErrorCk);
        nameDis.style.background = "";
        nameError.style.display = "none";
        nameError.innerHTML = "";
        
    }
}



function validEmail() {
    try {

        if (emailCheck.test(email.value) === false) {
            throw "Please enter a valid Email Address";
        }
        email.style.background = "";
        emailError.style.display = "none";
        emailError.innerHTML = "";
        emailErrorCk = true;

    } catch (msg) {
        emailError.style.display = "block";
        emailError.innerHTML = msg;
        email.style.background = "rgb(255,233,233)";
        emailErrorCk = false;
        console.log(emailErrorCk);

    }
    if (email.value === "") {
        emailError.innerHTML = "Please fill in this field";
        emailError.style.display = "block";
        email.style.background = "rgb(255,233,233)";
        emailError.style.position = "relative";
        emailError.style.left = "200px";
        emailErrorCk = false;
        console.log(emailErrorCk);
    }
}

updateBut.addEventListener('click', (event) =>{
    if(!emailErrorCk || !nameErrorCk || !userErrorCk)
    {
        event.preventDefault();
    }
});

function createEventListenersEmails() {
    if (username.addEventListener) {
        username.addEventListener("blur", usernameValid, false);
    } else if (username.attachEvent) {
        username.attachEvent("onchange", usernameValid);
    }
    if (nameDis.addEventListener) {
        nameDis.addEventListener("blur", nameValid, false);
    } else if (nameDis.attachEvent) {
        nameDis.attachEvent("onchange", nameValid);
    }
    if (email.addEventListener) {
        email.addEventListener("blur", validEmail, false);
    } else if (email.attachEvent) {
        email.attachEvent("onchange", validEmail);
    }
}


function setupPage() {
    createEventListenersEmails();
}



if (window.addEventListener) {
    window.addEventListener("load", setupPage, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", setupPage);
}
