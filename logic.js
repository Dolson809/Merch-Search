// Add Ticketmaster API here
$(document).ready(function () {


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
          e.innerHTML = json.page.totalPages + " events found.";
          showEvents(json);
          initMap(position, json);
        },
        error: function (xhr, status, err) {
          console.log(err);
        }
      });

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
    }
    getLocation();
  })





  function showEvents(json) {
    // for (var i = 0; i < json.page.size; i++) {
      //  $("#events").append("<p>" + json._embedded.events[i].images[0].url + "</p>");
      var artistName = $("<h3>").text(json._embedded.events[0].name);
      var artistImg = $("<img>").attr("src", json._embedded.events[0].images[0].url);
      var buyTickets = $("<a>").attr("href", json._embedded.events[0].url).text("Buy tickets here");
      var artistUrl = $("<a>").attr("href", json._embedded.events[0].url).append(buyTickets);
      $("#events").append(artistName, artistImg, buyTickets, artistUrl);
    // }
  }


  function initMap(position, json) {
    var map;
    console.log(map);
    var mapDiv = document.getElementById('map-display');
    map = new google.maps.Map(mapDiv, {
      center: { lat: position.coords.latitude, lng: position.coords.longitude },
      zoom: 12
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
  }
})











  // // Firebase link for Javascript
  // {/* <script src="https://www.gstatic.com/firebasejs/5.9.2/firebase.js"></script> */}


  // // Initialize Firebase
  // var config = {
  //     apiKey: "AIzaSyCB6qh2EIp56wDgCmKr6Xr7ZhC4QeWkCUE",
  //     authDomain: "live-band-locator.firebaseapp.com",
  //     databaseURL: "https://live-band-locator.firebaseio.com",
  //     projectId: "live-band-locator",
  //     storageBucket: "live-band-locator.appspot.com",
  //     messagingSenderId: "237657419064"
  //   };
  // firebase.initializeApp(config);

  // // Assign the reference to the database to a variable named 'database'
  // var database = firebase.database();

  // // Whenever a user clicks the submit button
  // $("#submit").on("click", function(event) {

  //     // Prevent form from submitting with event.preventDefault() or returning false
  //     event.preventDefault();

  //     // Variables to hold band and location
  //     var band = $("#band-input").val().trim();
  //     // Will probably need to find these within the APIs
  //     var venue = $("#venue").val().trim();
  //     var location = $("#location").val().trim();

  //     // Creating an object to push to firebase
  //     var newBand = {
  //         band: band,
  //         venue: venue,
  //         location: location
  //     }

  //     // Pushing results to firebase
  //     database.ref().push(newBand)

  //     // Clearing form
  //     $("#band-input").val("");
  // });

  // //  At the page load and subsequent value changes, get a snapshot of the stored data.
  // // This function allows you to update your page in real-time when the firebase database changes.

  // database.ref().on("child_added", function(snapshot) {
  //     // Variables to hold band name and location
  //     var band = snapshot.val().band;
  //     var venue = snapshot.val().venue;
  //     var location = snapshot.val().location;

  //     // Creating table for recent searches to show band, venue, and location
  //     $("#recent-searches > tbody").append(`
  //         <tr>
  //             <td>${band}</td>
  //             <td>${venue}</td>
  //             <td>${location}</td>
  //         </tr>
  //     `);
  // });