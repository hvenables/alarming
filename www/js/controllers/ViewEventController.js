ionicApp.controller('ViewEventController', ViewEventController);

function ViewEventController(UserService) {

  this.userEvent = function () {
    return UserService.user.events[window.location.hash.slice(17)];
  }

}
