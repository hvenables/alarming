ionicApp.controller('UpdateEventController', UpdateEventController);

function UpdateEventController(UserService) {

  var self = this;

  console.log(UserService.user.events[window.location.hash.slice(19)]);
  console.log(window.location.hash.slice(19));

  self.userEvent = UserService.user.events[window.location.hash.slice(19)];

  self.postcode = "Hello"

}
