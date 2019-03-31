
// Add Ticketmaster API here
function searchEvent(){
  
}

function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
      var x = document.getElementById("location");
      x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
function showPosition(position) {
  var x = document.getElementById("location");
  x.innerHTML = "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude; 
  var latlon = position.coords.latitude + "," + position.coords.longitude;


  $.ajax({
    type:"GET",
    url:"https://app.ticketmaster.com/discovery/v2/events.json?apikey=5QGCEXAsJowiCI4n1uAwMlCGAcSNAEmG&latlong="+latlon,
    async:true,
    dataType: "json",
    success: function(json) {
                console.log(json);
                var e = document.getElementById("events");
                e.innerHTML = json.page.totalElements + " events found.";
                showEvents(json);
                initMap(position, json);
             },
    error: function(xhr, status, err) {
                console.log(err);
             }
  });

}

function showError(error) {
  switch(error.code) {
      case error.PERMISSION_DENIED:
          x.innerHTML = "User denied the request for Geolocation."
          break;
      case error.POSITION_UNAVAILABLE:
          x.innerHTML = "Location information is unavailable."
          break;
      case error.TIMEOUT:
          x.innerHTML = "The request to get user location timed out."
          break;
      case error.UNKNOWN_ERROR:
          x.innerHTML = "An unknown error occurred."
          break;
  }
}



 
    








// Add Google Maps API here
var map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 10
    });
}
console.log(map);

function showEvents(json) {
    for(var i=0; i<json.page.size; i++) {
      $("#events").append("<p>"+json._embedded.events[i].name+"</p>");
    }
    }
    
    
    function initMap(position, json) {
    var mapDiv = document.getElementById('map');
    var map = new google.maps.Map(mapDiv, {
      center: {lat: position.coords.latitude, lng: position.coords.longitude},
      zoom: 10
    });
    for(var i=0; i<json.page.size; i++) {
      addMarker(map, json._embedded.events[i]);
    }
    }
    
    function addMarker(map, event) {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(event._embedded.venues[0].location.latitude, event._embedded.venues[0].location.longitude),
      map: map
    });
    marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
    console.log(marker);
    }
    
    
    
    
    getLocation();




















// Initialize Firebase

//var config = {
    // apiKey: "AIzaSyAoEc7sL7OiVj6hLTIpDm7YDRbbDWPpaAc",
    // authDomain: "first-project-93378.firebaseapp.com",
    // databaseURL: "https://first-project-93378.firebaseio.com",
    // projectId: "first-project-93378",
    // storageBucket: "first-project-93378.appspot.com",
    // messagingSenderId: "147228510230"
    // };
    // firebase.initializeApp(config);
    
    // // Assign the reference to the database to a variable named 'database'
    // var database = firebase.database();
    
    
    // //  At the page load and subsequent value changes, get a snapshot of the stored data.
    // // This function allows you to update your page in real-time when the firebase database changes.
    
    // database.ref().on("value", function(snapshot) {
    //     console.log(snapshot.val())
    // });
    
    // // Whenever a user clicks the submit-bid button
    // $("#submit-bid").on("click", function(event) {
        
    //     // prevent form from submitting with event.preventDefault() or returning false
    //         event.preventDefault();
    //     });