//---------------------
//This function is called to load the 5 most difficult questions.
//---------------------


// define a global variable to hold the layer so that we can use it later on
var xhrFormData5;
var quizPoints5;

function startFormDataLoad5() {
    w3.hide('#create_question');
    xhrFormData5 = new XMLHttpRequest();
    var url = "http://developer.cege.ucl.ac.uk:" + httpPortNumber;
    url = url + "/FiveMostDifficultQuestions";
    xhrFormData5.open("GET", url, true);
    xhrFormData5.onreadystatechange = formDataResponse5;
    xhrFormData5.send();
}

function formDataResponse5() {
    if (xhrFormData5.readyState == 4) {
        // once the data is ready, process the data
        var formData5 = xhrFormData5.responseText;
        loadFormData5(formData5);
    }
}

// keep the layer global so that we can automatically pop up a
// pop-up menu on a point if necessary
// we can also use this to determine distance for the proximity alert


// 'JSON' data included as above
//[{"array_to_json":[{"rank":18}]}]

function loadFormData5(formData5) {
    // convert the text received from the server to JSON
    var formJSON5 = JSON.parse(formData5);
    //alert("The most difficult questions is " + formJSON5[0].array_to_json[0].question_text + " among all users.");
    
    document.getElementById("mostDifQs").innerHTML = "<b>Five most difficult questions: </b>";
    document.getElementById("mostDifQs1").innerHTML = "<b>Top 1: </b>" + formJSON5[0].array_to_json[0].question_text;
    document.getElementById("mostDifQs2").innerHTML = "<b>Top 2: </b>" + formJSON5[0].array_to_json[1].question_text;
    document.getElementById("mostDifQs3").innerHTML = "<b>Top 3: </b>" + formJSON5[0].array_to_json[2].question_text;
    document.getElementById("mostDifQs4").innerHTML = "<b>Top 4: </b>" + formJSON5[0].array_to_json[3].question_text;
    document.getElementById("mostDifQs5").innerHTML = "<b>Top 5: </b>" + formJSON5[0].array_to_json[4].question_text;
}


