//---------------------
//Functions are called to upload the answers answered by the user and send them to the database.
//---------------------

function startAnswerUpload(id, ca, as) {
alert ("start data upload");
//var question_id = feature.properties.id;
var question_id = questionID;
alert(question_id);
//var correct_answer = document.getElementById("answer" + feature.properties.id + "").value;
var correct_answer = answer;
alert(correct_answer);
//var answer_selected =  document.getElementById("answer" + " + feature.properties.id + ").innerHTML;
var answer_selected = answerSelected;
alert(answer_selected);
var postString = "question_id=" + question_id + "&correct_answer=" + correct_answer + "&answer_selected=" + answer_selected;
// now get the select box values
//var correct_answer = document.getElementById("answerselectbox").value;
alert (postString);
processAnswer(postString);
}


var client2; // the global variable that holds the request


// adapted from week6 part2 
function processAnswer(postString) {
client2 = new XMLHttpRequest();
postString = postString + "&port_id=" + httpPortNumber;
var url = 'http://developer.cege.ucl.ac.uk:'+ httpPortNumber + "/uploadAnswer";
client2.open('POST',url,true);
client2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
client2.onreadystatechange = answerUploaded;
client2.send(postString);
}



// create the code to wait for the response from the data server, and process the response once it is received
function answerUploaded() {
// this function listens out for the server to say that the data is ready - i.e. has state 4
if (client2.readyState == 4) {
// change the DIV to show the response
document.getElementById("answerUploadResult").innerHTML = client2.responseText;
}
}