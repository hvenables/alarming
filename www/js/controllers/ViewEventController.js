ionicApp.controller('ViewEventController', ViewEventController);

function ViewEventController(UserService, $location, $ionicLoading) {

  var self = this;

  self.userEvent = function () {
    console.log(UserService.user.events)
    return UserService.user.events[window.location.hash.slice(17)];
  }

  self.mapCreated = function(map) {
    self.map = map;
  };

  self.centerOnMe = function () {
    console.log("Centering");
    if (!self.map) {
      return;
    }

    self.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log('Got pos', pos);
      var directionsDisplay = new google.maps.DirectionsRenderer();
      var directionsService = new google.maps.DirectionsService();
      var map = self.map;
      directionsDisplay.setMap(map);
      console.log(map !== undefined);
      console.log("hello");
      directionsService.route({
        origin: {lat: pos.coords.latitude, lng: pos.coords.longitude}, //current position
        destination: {lat: self.latlong.lat, lng: self.latlong.lng},
        travelMode: google.maps.TravelMode.DRIVING
        }, function(response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            self.loading.hide();
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
    });
  };

}
