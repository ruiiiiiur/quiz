
//---------------------
//This function is called to pop up the lat/log when user click the map and load the lat/log automatically in the question form
//---------------------

// create a custom popup
var popup = L.popup();
// create an event detector to wait for the user's click event and then use the popup to show them where they clicked
// note that you don't need to do any complicated maths to convert screen coordinates to real world coordiantes - the Leaflet API does this for you
function onMapClick(e) {
	popup
	.setLatLng(e.latlng)
	.setContent("You just clicked the map at " + e.latlng.toString())
	.openOn(mymap);
	//lat/lng entered automatically when the user clicks on a map in the question app.
	document.getElementsByName("lat")[0].value = e.latlng.lat;
	document.getElementsByName("lon")[0].value = e.latlng.lng;	
	}

// now add the click event detector to the map
mymap.on('click', onMapClick);




//---------------------
//This function is called to add the location of the UCL main gate
//---------------------

// create a geoJSON feature -
var geojsonFeature = {
	"type": "Feature",
	"properties": {
				"name": "UCL main gate",
				"popupContent": "UCL main gate"
				},
	"geometry": {
				"type": "Point",
				"coordinates": [-0.134503, 51.524257]
				}
	};


// Global variables: add awesome markers in different colors

var testMarkerGreen = L.AwesomeMarkers.icon({
icon: 'play',
markerColor: 'green'
});

var testMarkerRed = L.AwesomeMarkers.icon({
icon: 'play',
markerColor: 'red'
});

var testMarkerOrange = L.AwesomeMarkers.icon({
icon: 'home',
markerColor: 'orange'
});

var testMarkerDarkBlue = L.AwesomeMarkers.icon({
icon: 'home',
markerColor: 'darkblue'
});


var testMarkerBlue = L.AwesomeMarkers.icon({
icon: 'school',
markerColor: 'blue'
});


var testMarkerUCL = L.AwesomeMarkers.icon({
icon: 'school',
markerColor: 'darkpurple'
});



//---------------------
//This function is called to show the location of the main gate of UCL.
//---------------------

function addPoint(){
//  add it to the map
L.geoJSON(geojsonFeature, {
pointToLayer: function (feature, latlng) {
return L.marker(latlng,{icon:testMarkerUCL});
}
}).addTo(mymap).bindPopup("<b>" + "This is " +  geojsonFeature.properties.popupContent + "<b>" + ". You are sugguested to create your questions within the blue circle.").openPopup();}





//---------------------
//This function is called to add the buffer of the point (main gate of UCL).
//---------------------

// add a circle around UCL main gate
function addBuffer(){
L.circle([51.524257, -0.134503], 200, {
	color: 'cadetblue',
	fillColor: '#7697cc',
	fillOpacity: 0.3
	}).addTo(mymap);}

