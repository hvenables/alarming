ionicApp.controller('MyEventsController', MyEventsController);

function MyEventsController(UserService, $state) {

  this.userEvents = function () {
    return UserService.userEvents;
  };
}
