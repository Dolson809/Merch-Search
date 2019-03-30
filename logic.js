// Add Ticketmaster API here





















// Add Google Maps API here





















// Firebase link for Javascript
{/* <script src="https://www.gstatic.com/firebasejs/5.9.2/firebase.js"></script> */}


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

// Whenever a user clicks the submit button
$("#submit").on("click", function(event) {
    
    // Prevent form from submitting with event.preventDefault() or returning false
    event.preventDefault();

    // Variables to hold band and location
    var band = $("#bandInput").val().trim();
    var venue = $("#venue").val().trim();
    var location = $("#location").val().trim();

    // Creating an object to push to firebase
    var newBand = {
        band: band,
        venue: venue,
        location: location
    }

    // Pushing results to firebase
    database.ref().push(newBand)

    // Clearing form
    $("#bandInput").val("");
});

//  At the page load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update your page in real-time when the firebase database changes.

database.ref().on("child_added", function(snapshot) {
    // Variables to hold band name and location
    var band = snapshot.val().band;
    var venue = snapshot.val().venue;
    var location = snapshot.val().location;

    // Creating table for recent searches to show band, venue, and location
    $("#recent-searches > tbody").append(`
        <tr>
            <td>${band}</td>
            <td>${venue}</td>
            <td>${location}</td>
        </tr>
    `);
});
