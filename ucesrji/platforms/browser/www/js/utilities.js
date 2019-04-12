var httpPortNumber;
var httpsPortNumber;

//---------------------
//This function is called to get port number when question app and quiz app start.
//---------------------
function getPort(){
var xhr = new XMLHttpRequest();
xhr.addEventListener("load", function () {
var parser = new DOMParser();
var doc = parser.parseFromString(xhr.responseText, "application/xml");
httpPortNumber = doc.getElementsByTagName("node-port-http").item(0).textContent;
httpsPortNumber = doc.getElementsByTagName("node-port-https").item(0).textContent;
//alert("Port : " + httpPortNumber);
//startFormDataLoad();
});
// depending on whether we are in a browser or on a phone
// the location of the config file is different
// if we are on a phone then http and https won't be present
var configLocation = "res/port.xml";
xhr.open("get", configLocation, true);
xhr.send();
}


//---------------------
//This function is called to load all the quiz points created by users when quiz app starts.
//---------------------

function getQuizPoints(){

var xhr = new XMLHttpRequest();

xhr.addEventListener("load", function () {
var parser = new DOMParser();
var doc = parser.parseFromString(xhr.responseText, "application/xml");
httpPortNumber = doc.getElementsByTagName("node-port-http").item(0).textContent;
httpsPortNumber = doc.getElementsByTagName("node-port-https").item(0).textContent;
startFormDataLoad();
});
// depending on whether we are in a browser or on a phone
// the location of the config file is different
// if we are on a phone then http and https won't be present
var configLocation = "res/port.xml";
xhr.open("get", configLocation, true);
xhr.send();
}