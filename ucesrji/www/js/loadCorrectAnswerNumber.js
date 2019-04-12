//---------------------
//This function is called to load the number of answers the user answered correctly.
//---------------------

// define a global variable to hold the layer so that we can use it later on

var xhrFormData2;
var quizPoints2;

function startFormDataLoad2() {
    xhrFormData2 = new XMLHttpRequest();
    var url = "http://developer.cege.ucl.ac.uk:" + httpPortNumber;
    url = url + "/getCorrectAnswers/"+ httpPortNumber;
    xhrFormData2.open("GET", url, true);
    xhrFormData2.onreadystatechange = formDataResponse2;
    xhrFormData2.send();
}

function formDataResponse2() {
    if (xhrFormData2.readyState == 4) {
        // once the data is ready, process the data
        var formData2 = xhrFormData2.responseText;
        loadFormData2(formData2);
    }
}

// keep the layer global so that we can automatically pop up a
// pop-up menu on a point if necessary
// we can also use this to determine distance for the proximity alert


// 'JSON' data included as above
//[{"array_to_json":[{"num_questions":6}]}]


function loadFormData2(formData2) {
    // convert the text received from the server to JSON
    var formJSON2 = JSON.parse(formData2);
    //console.log(formJSON2[0].array_to_json[0].num_questions);
    alert("You have already correctly answered " + formJSON2[0].array_to_json[0].num_questions + " question(s).");
}


