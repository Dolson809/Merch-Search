// Add Ticketmaster API here





















// Add Google Maps API here





















// Initialize Firebase

var config = {
apiKey: "AIzaSyAoEc7sL7OiVj6hLTIpDm7YDRbbDWPpaAc",
authDomain: "first-project-93378.firebaseapp.com",
databaseURL: "https://first-project-93378.firebaseio.com",
projectId: "first-project-93378",
storageBucket: "first-project-93378.appspot.com",
messagingSenderId: "147228510230"
};
firebase.initializeApp(config);

// Assign the reference to the database to a variable named 'database'
var database = firebase.database();


//  At the page load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update your page in real-time when the firebase database changes.

database.ref().on("value", function(snapshot) {
    console.log(snapshot.val())
});

// Whenever a user clicks the submit-bid button
$("#submit-bid").on("click", function(event) {
    
    // prevent form from submitting with event.preventDefault() or returning false
        event.preventDefault();
    });