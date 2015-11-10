ionicApp.controller('ViewEventController', ViewEventController);

function ViewEventController(UserService, $location) {

  this.userEvent = UserService.userEvents[window.location.hash.slice(17)];

}
