//---------------------
//This function is called to load the last 5 questions that the user answered. 
//---------------------

// define a global variable to hold the layer so that we can use it later on
var formlayer6;
var xhrFormData6;
var quizPoints6;

function startFormDataLoad6() {
    xhrFormData6 = new XMLHttpRequest();
    var url = "http://developer.cege.ucl.ac.uk:" + httpPortNumber;
    url = url + "/lastFiveQs/"+ httpPortNumber;
    xhrFormData6.open("GET", url, true);
    xhrFormData6.onreadystatechange = formDataResponse6;
    xhrFormData6.send();
}

function formDataResponse6() {
    if (xhrFormData6.readyState == 4) {
        // once the data is ready, process the data
        var formData = xhrFormData6.responseText;
        loadFormData6(formData);
    }
}

// keep the layer global so that we can automatically pop up a
// pop-up menu on a point if necessary
// we can also use this to determine distance for the proximity alert


function loadFormData6(formData) {
    // convert the text received from the server to JSON
    var formJSON = JSON.parse(formData);
    quizPoints6 = formJSON;
    // load the geoJSON layer
    formLayer6 = L.geoJson(formJSON,
        {
            // use point to layer to create the points
            pointToLayer: function (feature, latlng) {
                // in this case, we build an HTML DIV string
                // using the values in the data
                var htmlString = "<div id='popup'" + feature.properties.id + "><h2>" + feature.properties.question_title + "</h2><br>";
                htmlString = htmlString + "<h3>" + feature.properties.question_text + "</h3><br>";
                htmlString = htmlString + "<input type='radio' name='answer' id = '" + feature.properties.id + "_1' / > " + feature.properties.answer_1 + "<br>";
                htmlString = htmlString + "<input type='radio' name='answer' id = '" + feature.properties.id + "_2' / > " + feature.properties.answer_2 + "<br>";
                htmlString = htmlString + "<input type='radio' name='answer' id = '" + feature.properties.id + "_3' / > " + feature.properties.answer_3 + "<br>";
                htmlString = htmlString + "<input type='radio' name='answer' id = '" + feature.properties.id + "_4' / > " + feature.properties.answer_4 + "<br>";
                //change the icon color to green if the question was answered correctly
                if (feature.properties.answer_correct == true)
                {return L.marker(latlng,{icon:testMarkerGreen}).bindPopup(htmlString);}
                //change the icon color to red if the question was answered wrongly
                if (feature.properties.answer_correct == false)
                {return L.marker(latlng,{icon:testMarkerRed}).bindPopup(htmlString);}
            },
        }).addTo(mymap);
    //mymap.fitBounds(formLayer6.getBounds());
}

function removeFormLayer6() {
    mymap.removeLayer(formLayer6);
    mymap.setView([51.505, -0.09], 16);
    }



 