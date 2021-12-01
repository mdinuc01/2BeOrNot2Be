let sa = document.getElementById("saInput");
let mc = document.getElementById("mcInput");
let numOfQuestions = document.getElementById("numOfQuestions");
let expiry = document.getElementById("expiry");
let questions = document.getElementById("questions").parentNode;
let child = document.getElementById("child");

function pageSetup() {

    if (sa.checked) {
            history.replaceState(null, 'Short Answer','/survey-list/add/SA/' + numOfQuestions.value + '/' + expiry.value);
            remove();
            questions.insertAdjacentHTML("beforeend", '<div id="child"></div>');
            let child = document.getElementById("child");
            for(i = 1; i <= numOfQuestions.value; i++){
                child.insertAdjacentHTML("beforeend",'<label> Question ' + i + ':');
           child.insertAdjacentHTML("beforeend",  '<input type="text" class="form-control inputAreas" id="q' + i +'TextField" placeholder="Enter Question " name="q'+ i +'" required tableindex '+(5+i)+'>');
        }
    } else if (mc.checked) {
        history.replaceState(null, 'Short Answer','/survey-list/add/MA/' + numOfQuestions.value + '/' + expiry.value);
        remove();
            questions.insertAdjacentHTML("beforeend", '<div id="child"></div>');
            let child = document.getElementById("child");
            for(i = 1; i <= numOfQuestions.value; i++){
                child.insertAdjacentHTML("beforeend",'<label> Question ' + i + ':');
                child.insertAdjacentHTML("beforeend",  '<input type="text" class="form-control inputAreas" id="q' + i +'TextField" placeholder="Enter Question " name="q'+ i +'" required tableindex '+(5+i)+'>');
                child.insertAdjacentHTML("beforeend",'<ul><li><input type="text" class="form-control inputAreas" id="q' + i + 'A1"placeholder="Enter Option 1" name="q'+i+'A1" required tableindex '+(6+i)+'></li><li><input type="text" class="form-control inputAreas" id="q'+i+'A2"placeholder="Enter Option 2" name="q'+i+'A2" required tableindex '+(7+i)+'></li><li><input type="text" class="form-control inputAreas" id="q'+i+'A3"placeholder="Enter Option 3" name="q'+i+'A3" required tableindex '+(8+i)+'></li><li><input type="text" class="form-control inputAreas" id="q'+i+'A4"placeholder="Enter Option 4" name="q'+i+'A4" required tableindex '+(9+i)+'></li></ul>');
            }
    }
}

function remove(){
    document.getElementById("child").remove();
}

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  let date = new Date;
  let datef = addDays(date, 1);

function addEventListener(){

    history.replaceState(null, 'Short Answer','/survey-list/add/SA/1/' + datef);
    
    for(i = 1; i <= numOfQuestions.value; i++){
        child.insertAdjacentHTML("beforeend",'<label> Question ' + i + ':');
        child.insertAdjacentHTML("beforeend",  '<input type="text" class="form-control inputAreas" id="q' + i +'TextField" placeholder="Enter Question " name="q'+ i +'" required>');
     }
    if(sa.addEventListener){
        sa.addEventListener("click", pageSetup, false);
        mc.addEventListener("click", pageSetup, false);
        expiry.addEventListener("click", pageSetup, false);
        numOfQuestions.addEventListener("change", pageSetup, false);
    } else if (sa.attachEvent){
        sa.attachEvent("onclick", pageSetup, false);
        mc.attachEvent("onclick", pageSetup, false);
        expiry.attachEvent("onclick", pageSetup, false);
        numOfQuestions.addEventListener("onchange", pageSetup, false);
    }
}

window.addEventListener("onload", addEventListener);