let oldPassword = document.getElementById("oldpassword");
let password1 = document.getElementById("newpassword");
let password2 = document.getElementById("newpassword2");
let passwordError1 = document.getElementById("passwordError");
let error2 = document.getElementById("passwordError2");
let error3 = document.getElementById("passwordError3");
let check1 = false;
let check2 = false;

function fillPass() {

        if (oldPassword.value === "") {
            error3.innerHTML = "Please fill in this field";
            error3.style.display = "block";
            oldPassword.style.background = "rgb(255,233,233)";
            error3.style.position = "relative";
            error3.style.left = "60%";
            check1 = false;
        }

        else {
            error3.style.display = "none";
            oldPassword.style.background = "";
            error3.innerHTML = "";
            check1 = true;
        }
 
}

function validPassword() {

    try {

        if (/.{6,}/.test(password1.value) === false) {
            throw "Password must contain at least 6 Characters";
        } else if (password1.value.localeCompare(password2.value) !== 0) {
            throw "Passwords must match";
        } else if (/[A-Z]/.test(password1.value) === false) {
            throw "Password must have at least one upper-case Letter";
        } else if (/\d/.test(password1.value) === false) {
            throw "Password must contain one number";
        }
        password1.style.background = "";
        password2.style.background = "";
        passwordError1.style.display = "none";
        passwordError1.innerHTML = "";
        check2 = true;

    } catch (msg) {
        passwordError1.style.display = "block";
        passwordError1.style.left = "50%";
        passwordError1.innerHTML = msg;
        password1.style.background = "rgb(255,233,233)";
        password2.style.background = "rgb(255,233,233)";
        check2 = false;


    }
}

function coverPass() {
    if(oldPassword.value != null)
    {
        error2.style.display = "none";
        error2.innerHTML = "";
    }
}

let passBut = document.getElementById("passBut");
passBut.addEventListener('click', (event) => {
    if (!check1 || !check2) {
        event.preventDefault();
    }
});

function createEventListeners() {
    if (password2.addEventListener) {
        password2.addEventListener("blur", validPassword, false);
    } else if (password2.attachEvent) {
        password2.attachEvent("onchange", validPassword);
    }
        if (oldPassword.addEventListener) {
            oldPassword.addEventListener("change", coverPass, false);
            oldPassword.addEventListener("blur", fillPass, false);
        } else if (oldPassword.attachEvent) {
            oldPassword.attachEvent("onchange", coverPass);
            oldPassword.attachEvent("onchange", fillPass);
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