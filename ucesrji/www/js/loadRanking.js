// define a global variable to hold the layer so that we can use it later on

var xhrFormData3;
var quizPoints3;

function startFormDataLoad3() {
    xhrFormData3 = new XMLHttpRequest();
    var url = "http://developer.cege.ucl.ac.uk:" + httpPortNumber;
    url = url + "/getRanking/"+ httpPortNumber;
    xhrFormData3.open("GET", url, true);
    xhrFormData3.onreadystatechange = formDataResponse3;
    xhrFormData3.send();
}

function formDataResponse3() {
    if (xhrFormData3.readyState == 4) {
        // once the data is ready, process the data
        var formData3 = xhrFormData3.responseText;
        loadFormData3(formData3);
    }
}

// keep the layer global so that we can automatically pop up a
// pop-up menu on a point if necessary
// we can also use this to determine distance for the proximity alert


// 'JSON' data included as above
//[{"array_to_json":[{"rank":18}]}]

function loadFormData3(formData3) {
    // convert the text received from the server to JSON
    var formJSON3 = JSON.parse(formData3);
    alert("You are ranked " + formJSON3[0].array_to_json[0].rank + " among all users.");
}


