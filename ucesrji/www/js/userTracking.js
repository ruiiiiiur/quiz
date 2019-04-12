//---------------------
//This function is called to track user's location when quiz app starts.
//---------------------


function trackLocation() {
if (navigator.geolocation) {
navigator.geolocation.watchPosition(showPosition);
} else {
document.getElementById('showLocation').innerHTML =
 "Geolocation is not supported by this browser.";
}
}


var userMarker;
function showPosition(position) {
if (userMarker){mymap.removeLayer(userMarker);}
userMarker = L.marker([position.coords.latitude, position.coords.longitude], {icon:testMarkerOrange}).addTo(mymap).bindPopup("<b>You are here</b>");
//document.getElementById('showLocation').innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
getDistance();
}


function getDistance() {
//alert('getting distance');
// getDistanceFromPoint is the function called once the distance has been found
navigator.geolocation.getCurrentPosition(closestFormPoint);
}


// code adapted from https://www.htmlgoodies.com/beyond/javascript/calculate-the-distance-between-two-points-inyour-web-apps.html
function calculateDistance(lat1, lon1, lat2, lon2, unit) {
var radlat1 = Math.PI * lat1/180;
var radlat2 = Math.PI * lat2/180;
var radlon1 = Math.PI * lon1/180;
var radlon2 = Math.PI * lon2/180;
var theta = lon1-lon2;
var radtheta = Math.PI * theta/180;
var subAngle = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
subAngle = Math.acos(subAngle);
subAngle = subAngle * 180/Math.PI; // convert the degree value returned by acos back to degrees from radians
dist = (subAngle/360) * 2 * Math.PI * 3956; // ((subtended angle in degrees)/360) * 2 * pi * radius )
// where radius of the earth is 3956 miles
if (unit=="K") { dist = dist * 1.609344 ;} // convert miles to km
if (unit=="N") { dist = dist * 0.8684 ;} // convert miles to nautical miles
return dist;
}


//---------------------
//This function is called to get the closest point to user's current location.
//---------------------



// take the leaflet formdata layer (in xhrFormData.js)
// go through each point one by one
// and measure the distance to user's current location
// for the closest point show the pop up of that point
function closestFormPoint(position) {
    var minDistance = 100000000000000000000000;
    var closestFormPoint = 0;
    // for this example, use the latitude/longitude of warren street
    // in your assignment replace this with the user's location
  //  alert(position.coords.latitude);
  //  alert(position.coords.longitude);
    var userlat = position.coords.latitude;
    var userlng = position.coords.longitude;
    formLayer.eachLayer(function (layer) {
        var distance = calculateDistance(userlat,
            userlng, layer.getLatLng().lat, layer.getLatLng().lng, 'K');
        if (distance < minDistance) {
            minDistance = distance;
            closestFormPoint = layer.feature.properties.id;
        }
    });
    // for this to be a proximity alert, the minDistance must be
    // closer than a given distance - you can check that here
    // using an if statement
    // show the popup for the closest point
    formLayer.eachLayer(function (layer) {
        if (layer.feature.properties.id == closestFormPoint) {
            layer.openPopup();
        }
    });
} 