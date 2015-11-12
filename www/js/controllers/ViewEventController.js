ionicApp.controller('ViewEventController', ViewEventController);

function ViewEventController(UserService, $location, $ionicLoading, $document) {

  var self = this;

  self.eventKey = window.location.hash.slice(17);

  self.userEvent = function () {
    return UserService.user.events[window.location.hash.slice(17)];
  };

  self.tellLate = function() {
    var eventTime = Date.parse(self.userEvent().dateTime);
    var time = Date.parse(new Date) - 600000;
    return (eventTime <= time);
  };

  self.late = function(key, attendee) {
    if(UserService.user.email == attendee.email) {
      if (self.userEvent().attendees[key].late === false) {
        self.userEvent().attendees[key].late = true;
      } else {
        self.userEvent().attendees[key].late = false;
      }
    };
  };

  self.response = function(key, attendee) {
    if(UserService.user.email == attendee.email) {
      if (self.userEvent().attendees[key].attending === false) {
        self.userEvent().attendees[key].attending = true;
        self.updateUserStatusTrue(key, attendee);
      } else {
        self.userEvent().attendees[key].attending = false;
        self.updateUserStatusFalse(key, attendee);
      }
    };
  };

  self.updateUserStatusTrue = function (key, attendee) {
    var usersRef = new Firebase('https://event-alarm.firebaseio.com/users');
    var eventsRef = new Firebase('https://event-alarm.firebaseio.com/events');
    var attending = {'attending' : true}
    usersRef.child(key).child('events').child(self.eventKey).child('attendees').child(key).update(attending);
    eventsRef.child(self.eventKey).child('attendees').child(key).update(attending);
  };

  self.updateUserStatusFalse = function (key, attendee) {
    var usersRef = new Firebase('https://event-alarm.firebaseio.com/users');
    var eventsRef = new Firebase('https://event-alarm.firebaseio.com/events');
    var attending = {'attending' : false}
    usersRef.child(key).child('events').child(self.eventKey).child('attendees').child(key).update(attending);
    eventsRef.child(self.eventKey).child('attendees').child(key).update(attending);
    console.log(key);
  };

  self.latlong = {
    lat: self.userEvent().location.lat,
    lng: self.userEvent().location.lng
  };

  self.mapCreated = function(map) {
    self.map = map;
  };

  self.setBounds = function() {
      var bounds = new google.maps.LatLngBounds();
      console.log(google.map.Markers)
      for (var i=0; i < markersArray.length; i++) {
        bounds.extend(markersArray[i].getPosition());
      }
      map.fitBounds(bounds);
  }

  self.showPositions = function() {

    navigator.geolocation.getCurrentPosition(function (pos) {
      var findMe = new google.maps.Marker({
        position: { lat: pos.coords.latitude, lng: pos.coords.longitude },
        map: self.map,
        title: "Hello World"
      });
      self.setBounds()
    });
  }

  self.centerOnMe = function (mode) {
    if (!self.map) {
      return;
    }

    var selectedMode = mode || "DRIVING";

    self.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function (pos) {
      var directionsDisplay = new google.maps.DirectionsRenderer();
      var directionsService = new google.maps.DirectionsService();
      var map = self.map;
      directionsDisplay.setMap(map);
      self.viewDirections = true;
      directionsDisplay.setPanel(document.querySelector("#directions"));
      directionsService.route({
        origin: {lat: pos.coords.latitude, lng: pos.coords.longitude},
        destination: {lat: self.latlong.lat, lng: self.latlong.lng},
        travelMode: google.maps.TravelMode[selectedMode]
        }, function(response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            marker = null;
            self.loading.hide();
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
    });
  };

}
