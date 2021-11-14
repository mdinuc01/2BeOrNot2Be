let password1 = document.getElementById("newpassword");
let password2 = document.getElementById("newpassword2");
let passwordError1 = document.getElementById("passwordError");
let oldPass = document.getElementById("oldpassword");
let error2 = document.getElementById("passwordError2");
let check = false;

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
        check = true;
        
    } catch (msg) {
        passwordError1.style.display = "block";
        passwordError1.innerHTML = msg;
        password1.style.background =  "rgb(255,233,233)";
        password2.style.background =  "rgb(255,233,233)";

        
    }
}

function coverPass(){
    error2.style.display = "none";
}

let passBut = document.getElementById("passBut");
passBut.addEventListener('click', (event) =>{
    if(!check)
    {
        event.preventDefault();
    }
});

function createEventListeners(){
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
    
    function setupPage(){
        createEventListeners();
}

if (window.addEventListener) {
    window.addEventListener("load", setupPage, false);
  } else if (window.attachEvent)  {
    window.attachEvent("onload", setupPage);
}