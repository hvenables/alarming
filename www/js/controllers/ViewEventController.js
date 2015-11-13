ionicApp.controller('ViewEventController', ViewEventController);

function ViewEventController(UserService, $location, $ionicLoading, $document) {

  var self = this;

  self.eventKey = window.location.hash.slice(17);

  self.userEvent = function () {
    return UserService.user.events[self.eventKey];
  };

  self.userEventAttendees = function () {
    return UserService.attendeesAsArray(self.userEvent(), true);
  };

  self.tellLate = function() {
    return UserService.user.email == attendee.email
  };

  self.late = function(key, attendee, minutes) {
    if (UserService.user.email == attendee.email) {
      if (self.userEvent().attendees[key].late === false) {
        self.userEvent().attendees[key].late = true;
        self.updateUserLateTrue(key, attendee, minutes);
      } else {
        self.userEvent().attendees[key].late = false;
        self.updateUserLateFalse(key, attendee, minutes);
      }
    };
  };

  self.response = function(key, attendee) {
    if (UserService.user.email == attendee.email) {
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
    var attending = { attending: true };
    for (var invitee in self.userEvent().attendees) {
      usersRef.child(invitee).child('events').child(self.eventKey).child('attendees').child(key).update(attending);
    }
    eventsRef.child(self.eventKey).child('attendees').child(key).update(attending);
  };

  self.updateUserStatusFalse = function (key, attendee) {
    var usersRef = new Firebase('https://event-alarm.firebaseio.com/users');
    var eventsRef = new Firebase('https://event-alarm.firebaseio.com/events');
    var attending = { attending: false };
    for (var invitee in self.userEvent().attendees) {
      usersRef.child(invitee).child('events').child(self.eventKey).child('attendees').child(key).update(attending);
    }
    eventsRef.child(self.eventKey).child('attendees').child(key).update(attending);
  };

  self.updateUserLateTrue = function (key, attendee, minutes) {
    var usersRef = new Firebase('https://event-alarm.firebaseio.com/users');
    var eventsRef = new Firebase('https://event-alarm.firebaseio.com/events');
    var late = { late: {
                  late: true,
                  amount: minutes,
                      }
                    };
    for (var invitee in self.userEvent().attendees) {
      usersRef.child(invitee).child('events').child(self.eventKey).child('attendees').child(key).update(late);
    }
    eventsRef.child(self.eventKey).child('attendees').child(key).update(late);
  };

  self.updateUserLateFalse = function (key, attendee, minutes) {
    var usersRef = new Firebase('https://event-alarm.firebaseio.com/users');
    var eventsRef = new Firebase('https://event-alarm.firebaseio.com/events');
    var late = { late: {
                  late: false,
                  amount: minutes,
                      }
                    };
    for (var invitee in self.userEvent().attendees) {
      usersRef.child(invitee).child('events').child(self.eventKey).child('attendees').child(key).update(late);
    }
    eventsRef.child(self.eventKey).child('attendees').child(key).update(late);
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

  self.mode = "WALKING";

  self.setTransport = function(type) {
    self.mode = type;
  }

  self.centerOnMe = function () {
    if (!self.map) {
      return;
    }

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
        travelMode: google.maps.TravelMode[self.mode]
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
