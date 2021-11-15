
function SA() {
    console.log("In method");
    // let questions = document.getElementById("questions").parentNode;
    // let child = document.getElementById("child");
    // remove();
    
    // questions.insertAdjacentHTML("beforeend", '<div id="child"></div>');
    // for(i = 1; i <= num; i++){
    //     child.insertAdjacentHTML("beforeend",'<h4 style="font-family: verdana;" class="questions"><%= survey.q' + i +'%></h4>');
    //     child.insertAdjacentHTML("beforeend", '<textarea class="form-control"></textarea>')
    //     console.log(i);
    // }
}

function MA(){
    console.log("In method");
    let questions = document.getElementById("questions").parentNode;
    let child = document.getElementById("child");
    remove();
    questions.insertAdjacentHTML("beforeend", '<div id="child"></div>');
    for(i = 1; i <= num; i++){

    }
}

function remove(){
    document.getElementById("child").remove();
}

window.addEventListener("onload", SA);
window.addEventListener("onload", MA);