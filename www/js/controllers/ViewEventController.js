ionicApp.controller('ViewEventController', ViewEventController);

function ViewEventController(UserService, $ionicLoading, $http) {

  var self = this;

  self.userEvent = UserService.userEvents[window.location.hash.slice(17)];

  self.latlong = {
    lat: self.userEvent.location.lat,
    lng: self.userEvent.location.lng
  }
}
