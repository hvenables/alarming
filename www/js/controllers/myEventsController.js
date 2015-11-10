ionicApp.controller('MyEventsController', MyEventsController);

function MyEventsController(UserService) {

  this.userEvents = function () {
    return UserService.userEvents;
  };

}
