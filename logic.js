// Initialize Firebase
var config = {
    apiKey: "AIzaSyCB6qh2EIp56wDgCmKr6Xr7ZhC4QeWkCUE",
    authDomain: "live-band-locator.firebaseapp.com",
    databaseURL: "https://live-band-locator.firebaseio.com",
    projectId: "live-band-locator",
    storageBucket: "live-band-locator.appspot.com",
    messagingSenderId: "237657419064"
  };
firebase.initializeApp(config);

// Assign the reference to the database to a variable named 'database'
var database = firebase.database();

// Add Ticketmaster API here
$(document).ready(function(){
  

  $('#search-form').on('submit', function (event) {
      event.preventDefault();
      var search = $("#search").val();
      widgetsLib.widgetsMap[0].eventsRootContainer.parentNode.setAttribute('w-keyword', search)
      widgetsLib.widgetsMap[0].update();
      $('#mapContainer').attr('w-keyword', search);
        function showPosition(position) {
            var latlon = position.coords.latitude + "," + position.coords.longitude;
        
            $.ajax({
                type:"GET",
                url:"https://app.ticketmaster.com/discovery/v2/events.json?apikey=5QGCEXAsJowiCI4n1uAwMlCGAcSNAEmG&keyword=" + search,
                async:true,
                dataType: "json",
                success: function(json) {
                    console.log(json);
                    showEvents(json);
                },
                error: function(xhr, status, err) {
                    console.log(err);
                }
            });

            // Firebase
            // Variables to hold band and location
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            // Creating an object to push to firebase
            var newSearch = {
                search: search,
                latitude: latitude,
                longitude: longitude
            }
            console.log(newSearch);
            // Pushing results to firebase
            database.ref().push(newSearch);       
        }

        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, showError);
            } else {
                var x = document.getElementById("location");
                x.innerHTML = "Geolocation is not supported by this browser.";
            }
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
        getLocation();
    });
    database.ref().on("child_added", function(snapshot) {
        // Variables to hold search name
        var search = snapshot.val().search;
        console.log(search);
        // // Creating table for recent searches to show band, venue, and location
        $("#recent-search-input").prepend(search + "<br>");
  });
});
  
function showEvents(json) {
    $("#artist-image").attr("src", json._embedded.events[0].images[0].url);
    $("#artist-image").css({"height": "auto", "width": "50%", "margin": "auto"});
    $("#buy-tickets").attr("href", json._embedded.events[0].url).text("Buy Tickets")
    $("#artist-name").text(json._embedded.events[0].name);1
}
  