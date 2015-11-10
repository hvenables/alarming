ionicApp.controller('ViewEventController', ViewEventController);

function ViewEventController(UserService) {

  this.userEvent = UserService.userEvents[window.location.hash.slice(17)];

}
