
let type = document.getElementById("type");
let numOfQuestions = document.getElementById("numOfQuestions");
let num = parseInt(numOfQuestions.textContent);
let questions = document.getElementById("questions").parentNode;
let child = document.getElementById("child");

(function () {

    function Start() {

        if (type.textContent == "SA") {
            questions.insertAdjacentHTML("beforeend", '<div id="child"></div>');
            let child = document.getElementById("child");
            for (i = 1; i <= num; i++) {
                let value = <%=survey.q' + i + ' %>;
                child.insertAdjacentHTML("beforeend", '<label> Question ' + i + ':');
                child.insertAdjacentHTML("beforeend", '<input type="text" class="form-control inputAreas" id="q' + i + 'TextField" placeholder="Enter Question " name="q' + i + '" required tableindex ' + (5 + i) + ' value = ' + value);
            }
        } else if (type.textContent == "MA") {
            questions.insertAdjacentHTML("beforeend", '<div id="child"></div>');
            let child = document.getElementById("child");
            for (i = 1; i <= num; i++) {
                child.insertAdjacentHTML("beforeend", '<label> Question ' + i + ':');
                child.insertAdjacentHTML("beforeend", '<input type="text" class="form-control inputAreas" id="q' + i + 'TextField" placeholder="Enter Question " name="q' + i + '" required tableindex ' + (5 + i) + '>');
                child.insertAdjacentHTML("beforeend", '<ul><li><input type="text" class="form-control inputAreas" id="q' + i + 'A1"placeholder="Enter Option 1" name="q' + i + 'A1" required tableindex ' + (6 + i) + '></li><li><input type="text" class="form-control inputAreas" id="q' + i + 'A2"placeholder="Enter Option 2" name="q' + i + 'A2" required tableindex ' + (7 + i) + '></li><li><input type="text" class="form-control inputAreas" id="q' + i + 'A3"placeholder="Enter Option 3" name="q' + i + 'A3" required tableindex ' + (8 + i) + '></li><li><input type="text" class="form-control inputAreas" id="q' + i + 'A4"placeholder="Enter Option 4" name="q' + i + 'A4" required tableindex ' + (9 + i) + '></li></ul>');
            }

        }

    }
    window.addEventListener("load", Start);
})();

