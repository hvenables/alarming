ionicApp.controller('ViewEventController', ViewEventController);

function ViewEventController(UserService, $location, $ionicLoading) {

  var self = this;

  self.userEvent = function () {
    return UserService.user.events[window.location.hash.slice(17)];
  };

  self.tellLate = function() {
    var eventTime = Date.parse(self.userEvent().dateTime);
    var time = Date.parse(new Date) - 600000;
    return (eventTime <= time);
  };

  self.late = function(key) {
    if (self.userEvent().attendees[key].late === false) {
      self.userEvent().attendees[key].late = true;
    } else {
      self.userEvent().attendees[key].late = false;
    }
  };

  self.response = function(key) {
    if (self.userEvent().attendees[key].attending === false) {
      self.userEvent().attendees[key].attending = true;
    } else {
      self.userEvent().attendees[key].attending = false;
    }
  };

  self.latlong = {
    lat: self.userEvent().location.lat,
    lng: self.userEvent().location.lng
  }

  self.mapCreated = function(map) {
    self.map = map;
  };

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
      directionsService.route({
        origin: {lat: pos.coords.latitude, lng: pos.coords.longitude}, //current position
        destination: {lat: self.latlong.lat, lng: self.latlong.lng},
        travelMode: google.maps.TravelMode.DRIVING
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
