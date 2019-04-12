
function quizStartup(){
loadW3HTML();
getPort();
trackLocation();  
addBuffer();
getQuizPoints();
}

function quizstartup() {
document.addEventListener('DOMContentLoaded', function() {
quizStartup ();
}, false);
}

function loadW3HTML() {
w3.includeHTML();
}