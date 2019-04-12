// define a global variable to hold the layer so that we can use it later on
var formlayer;
var xhrFormData;
var quizPoints;

function startFormDataLoad() {
    xhrFormData = new XMLHttpRequest();
    var url = "http://developer.cege.ucl.ac.uk:" + httpPortNumber;
    url = url + "/getQuizPoints/"+ httpPortNumber;
    xhrFormData.open("GET", url, true);
    xhrFormData.onreadystatechange = formDataResponse;
    xhrFormData.send();
}

function formDataResponse() {
    if (xhrFormData.readyState == 4) {
        // once the data is ready, process the data
        var formData = xhrFormData.responseText;
        loadFormData(formData);
    }
}

// keep the layer global so that we can automatically pop up a
// pop-up menu on a point if necessary
// we can also use this to determine distance for the proximity alert


function loadFormData(formData) {
    // convert the text received from the server to JSON
    var formJSON = JSON.parse(formData);
    quizPoints = formJSON;
    // load the geoJSON layer
    formLayer = L.geoJson(formJSON,
        {
            // use point to layer to create the points
            pointToLayer: function (feature, latlng) {
                // in this case, we build an HTML DIV string
                // using the values in the data
                var htmlString = "<div id='popup'" + feature.properties.id + "><h5>" + feature.properties.question_title + "</h5>";
                htmlString = htmlString + "<h6>" + feature.properties.question_text + "</h6><br>";
                htmlString = htmlString + "<input type='radio' name='answer' id = '" + feature.properties.id + "_1' / > " + feature.properties.answer_1 + "<br>";
                htmlString = htmlString + "<input type='radio' name='answer' id = '" + feature.properties.id + "_2' / > " + feature.properties.answer_2 + "<br>";
                htmlString = htmlString + "<input type='radio' name='answer' id = '" + feature.properties.id + "_3' / > " + feature.properties.answer_3 + "<br>";
                htmlString = htmlString + "<input type='radio' name='answer' id = '" + feature.properties.id + "_4' / > " + feature.properties.answer_4 + "<br>";
                //htmlString = htmlString + "<input type='radio' name='answer' id = '" + feature.properties.id + "_4' / > " + feature.properties.port_id + " < br > ";
                htmlString = htmlString + "<button onclick='checkAnswer(" + feature.properties.id + ", [" + feature.geometry.coordinates + "]);return false;'>Submit Answer</button>";
                
                // now include a hidden element with the answer
                // in this case the answer is always the first choice
                // for the assignment this will of course vary - you can use feature.properties.correct_answer
                htmlString = htmlString + "<div id=answer" + feature.properties.id + " hidden> " + feature.properties.correct_answer + " </div>";
                //htmlString = htmlString + "<div id=answer" + feature.properties.id + " hidden>1</div>";
                //var correctanswerla = feature.properties.correct_answer;
                //document.getElementById("answer" + feature.properties.id + "").innerHTML = correctanswerla;
                //htmlString = htmlString + "</div>";
                


                return L.marker(latlng, {icon:testMarkerDarkBlue}).bindPopup(htmlString);
            },
        }).addTo(mymap);
    mymap.fitBounds(formLayer.getBounds());
}

function removeFormLayer() {
    mymap.removeLayer(formLayer);
    mymap.setView([51.524257, -0.134503], 16);
    }

// Add a method to process the button click in this pop-up.
function checkAnswer(questionID, coor) {
    // get the answer from the hidden div
    // NB - do this BEFORE you close the pop-up as when you close the pop-up the DIV is destroyed
    var answer = document.getElementById("answer" + questionID).innerHTML;
    // now check the question radio buttons
    var correctAnswer = false;
    var answerSelected = 0;
    //alert(coor);
    for (var i = 1; i < 5; i++) {
        if (document.getElementById(questionID + "_" + i).checked) {
            answerSelected = i;
        }
        if ((document.getElementById(questionID + "_" + i).checked) && (i == answer)) {
            alert("Well done");
            correctAnswer = true;
            
            L.geoJSON(geojsonFeature, {
            pointToLayer: function (feature, latlng) {
            return L.marker([coor[1],coor[0]], {icon:testMarkerGreen});
            }
            }).addTo(mymap);
        }
    }
    if (correctAnswer === false) {
        // they didn't get it right
        alert("Better luck next time");
        L.geoJSON(geojsonFeature, {
        pointToLayer: function (feature, latlng) {
        return L.marker([coor[1],coor[0]], {icon:testMarkerRed});
        }
        }).addTo(mymap);
    }
    // now close the popup
    mymap.closePopup();
    // the code to upload the answer to the server would go here
    // call an AJAX routine using the data
    // the answerSelected variable holds the number of the answer
    // that the user picked
    //alert ("start data upload");
    //var question_id = feature.properties.id;
    var question_id = questionID;
    //alert(question_id);
    //var correct_answer = document.getElementById("answer" + feature.properties.id + "").value;
    var correct_answer = answer;
    //alert(correct_answer);
    //var answer_selected =  document.getElementById("answer" + " + feature.properties.id + ").innerHTML;
    var answer_selected = answerSelected;
    //alert(answer_selected);
    var postString = "question_id=" + question_id + "&correct_answer=" + correct_answer + "&answer_selected=" + answer_selected;
    // now get the select box values
    //var correct_answer = document.getElementById("answerselectbox").value;
    alert (postString);
    processAnswer(postString);
    startFormDataLoad2();
}



