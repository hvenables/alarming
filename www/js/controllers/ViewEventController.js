ionicApp.controller('ViewEventController', ViewEventController);

function ViewEventController(UserService, $location, $ionicLoading) {

  var self = this;

  self.attending = false;

  self.userEvent = function () {
    return UserService.user.events[window.location.hash.slice(17)];
  };

  self.late = function() {
    var eventTime = Date.parse(self.userEvent().dateTime);
    var time = Date.parse(new Date) - 600000;
    return (eventTime <= time);
  };

  self.response = function() {
    if (self.attending === false) {
      self.attending = true;
      console.log(self.attending)
    } else {
      self.attending = false;
      console.log(self.attending)
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
