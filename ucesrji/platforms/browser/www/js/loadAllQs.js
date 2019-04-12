//---------------------
//This function is called to get all questions uploaded by all users.
//---------------------


// define a global variable to hold the layer so that we can use it later on
var formlayer7;
var xhrFormData7;
var quizPoints7;

function startFormDataLoad7() {
    xhrFormData7 = new XMLHttpRequest();
    var url = "http://developer.cege.ucl.ac.uk:" + httpPortNumber;
    url = url + "/getAllQuestions";
    xhrFormData7.open("GET", url, true);
    xhrFormData7.onreadystatechange = formDataResponse7;
    xhrFormData7.send();
}

function formDataResponse7() {
    if (xhrFormData7.readyState == 4) {
        // once the data is ready, process the data
        var formData = xhrFormData7.responseText;
        loadFormData7(formData);
    }
}

// keep the layer global so that we can automatically pop up a
// pop-up menu on a point if necessary
// we can also use this to determine distance for the proximity alert


function loadFormData7(formData) {
    // convert the text received from the server to JSON
    var formJSON = JSON.parse(formData);
    quizPoints7 = formJSON;
    // remove the layer if existed

    // load the geoJSON layer
    formLayer7 = L.geoJson(formJSON,
        {
            // use point to layer to create the points
            pointToLayer: function (feature, latlng) {
                // in this case, we build an HTML DIV string
                // using the values in the data
                var htmlString = "<div id='popup'" + feature.properties.id + "><h5>" + feature.properties.question_title + "</h5><br>";
                htmlString = htmlString + "<h6>" + feature.properties.question_text + "</h6><br>";
                htmlString = htmlString + "<input type='radio' name='answer' id = '" + feature.properties.id + "_1' / > " + feature.properties.answer_1 + "<br>";
                htmlString = htmlString + "<input type='radio' name='answer' id = '" + feature.properties.id + "_2' / > " + feature.properties.answer_2 + "<br>";
                htmlString = htmlString + "<input type='radio' name='answer' id = '" + feature.properties.id + "_3' / > " + feature.properties.answer_3 + "<br>";
                htmlString = htmlString + "<input type='radio' name='answer' id = '" + feature.properties.id + "_4' / > " + feature.properties.answer_4 + "<br>";
                return L.marker(latlng,{icon:testMarkerBlue}).bindPopup(htmlString);
            },
        }).addTo(mymap,{icon:testMarkerBlue});
    mymap.fitBounds(formLayer7.getBounds());}


function removeFormLayer7() {
    mymap.removeLayer(formLayer7);
    }



