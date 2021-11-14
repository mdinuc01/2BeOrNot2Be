var email = document.getElementById("email");
var emailError = document.getElementById("emailError");
var updateBut = document.getElementById("updateBut");
var checkEmail = true;

var emailCheck = /^[_\w\-]+(\.[_\w\-]+)*@[\w\-]+(\.[\w\-]+)*(\.[\D]{2,6})$/;

function validEmail() {
    try {

        if (emailCheck.test(email.value) === false) {
            throw "Please enter a valid Email Address";
        }
        email.style.background = "";
        emailError.style.display = "none";
        emailError.innerHTML = "";
        checkEmail = true;
        

    } catch (msg) {
        emailError.style.display = "block";
        emailError.innerHTML = msg;
        email.style.background = "rgb(255,233,233)";
        checkEmail = false;

    }
    if (email.value === "") {
        emailError.innerHTML = "Please fill in this field";
        emailError.style.display = "block";
        email.style.background = "rgb(255,233,233)";
        emailError.style.position = "relative";
        emailError.style.left = "70px";
        checkEmail = false;
    }
}

updateBut.addEventListener('click', (event) =>{
    if(!checkEmail)
    {
        event.preventDefault();
    }
});

function createEventListenersEmails() {
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
