
function questionStartup(){
loadW3HTML();
getPort();
addPoint();
addBuffer();

}

function questionstartup() {
document.addEventListener('DOMContentLoaded', function() {
questionStartup ();
}, false);
}

function loadW3HTML() {
w3.includeHTML();
}