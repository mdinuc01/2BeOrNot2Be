let btn = document.getElementById("ok");
let box = document.getElementById("messageBox");

function remove(){
   box.style.display = "none";
}

function createEventListeners(){
    if (btn.addEventListener) {
        btn.addEventListener("click", remove, false);
    }   else if (btn.attachEvent) {
        btn.attachEvent("onclick", remove);
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


$(document).ready(function() {
    $(".overlay, .overlay-message").show();

    $(".overlay-message").click(function() {
        $(".overlay, .overlay-message").hide();
    });
});