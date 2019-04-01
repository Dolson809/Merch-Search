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



$('#search-form').on('submit', function (event) {
    event.preventDefault();
    var search = $("#search").val();

    function showPosition(position) {
        var x = document.getElementById("location");
        x.innerHTML = "Latitude: " + position.coords.latitude +
            "<br>Longitude: " + position.coords.longitude;
        var latlon = position.coords.latitude + "," + position.coords.longitude;

        $.ajax({
            type: "GET",
            url: "https://app.ticketmaster.com/discovery/v2/events.json?apikey=5QGCEXAsJowiCI4n1uAwMlCGAcSNAEmG&keyword=" + search + "&latlong=" + latlon,
            async: true,
            dataType: "json",
            success: function (json) {
                console.log(json);
                var e = document.getElementById("events");
                e.innerHTML = json.page.totalElements + " events found.";
                showEvents(json);
                initMap(position, json);
            },
            error: function (xhr, status, err) {
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

    };
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            var x = document.getElementById("location");
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    };

    function showError(error) {
        switch (error.code) {
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
    };
    function showEvents(json) {
        for (var i = 0; i < json.page.size; i++) {
            $("#events").append("<p>" + json._embedded.events[i].name + "</p>");
        }
    };

    function initMap(position, json) {
        var mapDiv = document.getElementById('map');
        map = new google.maps.Map(mapDiv, {
            center: { lat: position.coords.latitude, lng: position.coords.longitude },
            zoom: 10
        });
        for (var i = 0; i < json.page.size; i++) {
            addMarker(map, json._embedded.events[i]);
        }
    };

    function addMarker(map, event) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(event._embedded.venues[0].location.latitude, event._embedded.venues[0].location.longitude),
            map: map
        });
        marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
        console.log(marker);
    };
    getLocation();

    database.ref().on("child_added", function(snapshot) {
        // Variables to hold search name
        var search = snapshot.val().search;
    
        // // Creating table for recent searches to show band, venue, and location
        $("#recent-searches > tbody").append(`
            <tr>
                <td>${search}</td>
            </tr>
        `);
    });

});


















// // Firebase link for Javascript
// {/* <script src="https://www.gstatic.com/firebasejs/5.9.2/firebase.js"></script> */}





//  At the page load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update your page in real-time when the firebase database changes.


