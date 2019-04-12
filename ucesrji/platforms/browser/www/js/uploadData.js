//---------------------
//Functions are called to upload the questions created by the user and send them to the database.
//---------------------

function startDataUpload() {
//alert ("start data upload");
var question_title = document.getElementById("question_title").value;
var question_text = document.getElementById("question_text").value;
var answer_1 = document.getElementById("answer_1").value;
var answer_2 = document.getElementById("answer_2").value;
var answer_3 = document.getElementById("answer_3").value;
var answer_4 = document.getElementById("answer_4").value;
var postString = "question_title="+question_title +"&question_text="+question_text+"&answer_1="+answer_1+"&answer_2="+answer_2+"&answer_3="+answer_3+"&answer_4="+answer_4;

// now get the geometry values
var latitude = document.getElementById("latitude").value;
var longitude = document.getElementById("longitude").value;


// now check whether the field is filled and popup alert if the field is empty 
if (latitude == "" ) {
alert( "Please enter your latitude." ); return false;}   
if (longitude == "" ) {
alert( "Please enter your longitude." ); return false;}   
if (question_title == "" ) {
alert( "Please enter your question title." ); return false;}   
if (question_text == "" ) {
alert( "Please enter your question text." ); return false;}   
if (answer_1 == "" ) {
alert( "Please enter answer 1." ); return false;}   
if (answer_2 == "" ) {
alert( "Please enter answer 2." ); return false;}   
if (answer_3 == "" ) {
alert( "Please enter answer 3." ); return false;}   
if (answer_4 == "" ) {
alert( "Please enter answer 4." ); return false;}   


postString = postString + "&latitude=" + latitude + "&longitude=" + longitude;


// now get the select box values
var correct_answer = document.getElementById("answerselectbox").value;
postString = postString + "&correct_answer="+correct_answer;
alert (postString);
processData(postString);
}


var client; // the global variable that holds the request


// adapted from week6 part2 
function processData(postString) {
client = new XMLHttpRequest();
postString = postString + "&port_id=" + httpPortNumber;
var url = 'http://developer.cege.ucl.ac.uk:'+ httpPortNumber + "/uploadQuestion";
client.open('POST',url,true);
client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
client.onreadystatechange = dataUploaded;
client.send(postString);
}



// create the code to wait for the response from the data server, and process the response once it is received
function dataUploaded() {
// this function listens out for the server to say that the data is ready - i.e. has state 4
if (client.readyState == 4) {
// change the DIV to show the response
document.getElementById("dataUploadResult").innerHTML = client.responseText;
}
}