// Add Ticketmaster API here
$(document).ready(function(){
  

  $('#search-form').on('submit', function (event) {
      event.preventDefault();
      var search = $("#search").val();
      widgetsLib.widgetsMap[0].eventsRootContainer.parentNode.setAttribute('w-keyword', search)
      widgetsLib.widgetsMap[0].update();
      $('#mapContainer').attr('w-keyword', search);
      function showPosition(position) {
        //  var x = document.getElementById("location"); 
          // x.innerHTML = "Latitude: " + position.coords.latitude + 
          // "<br>Longitude: " + position.coords.longitude; 
          var latlon = position.coords.latitude + "," + position.coords.longitude;
        
        
          $.ajax({
            type:"GET",
            url:"https://app.ticketmaster.com/discovery/v2/events.json?apikey=5QGCEXAsJowiCI4n1uAwMlCGAcSNAEmG&keyword=" + search,
            async:true,
            dataType: "json",
            success: function(json) {
                  console.log(json);
                  var e = document.getElementById("events");
                  e.innerHTML = json.page.totalElements + " events found.";
                  showEvents(json);
              },
            error: function(xhr, status, err) {
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
  })
  
  
  
  
  
  function showEvents(json) {
  // for(var i=0; i<json.page.size; i++) {
  //   $("#events").append("<p>"+json._embedded.events[i].name+"</p>");
  // }
  $("#eventPara").html(json._embedded.events[0].name);
  var artistImg = $("<img>").attr("src", json._embedded.events[0].images[0].url);
  artistImg.css({"height": "auto", "width": "75%"});
  var buyTickets = $("<a>").attr("href", json._embedded.events[0].url).text("Buy tickets here");
  var artistUrl = $("<a>").attr("href", json._embedded.events[0].url).append(buyTickets);
  $("#venuePara").html(json.events[0]._embedded.venues[0].name);
  $("#addressPara").html(json.events[0]._embedded.venues.address.line1);
  // $("#events").append(artistName, artistImg, buyTickets, artistUrl, artistVenue, venueAddress);
  }
  
  
  function initMap(position, json) {
    var map;
    console.log(map);
    var mapDiv = document.getElementById('map-display');
    map = new google.maps.Map(mapDiv, {
    center: {lat: position.coords.latitude, lng: position.coords.longitude},
    zoom: 12
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
  })
  
  
  
  