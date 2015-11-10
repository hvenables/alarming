ionicApp.controller('MyEventsController', MyEventsController);

function MyEventsController(UserService) {

  this.userEvents = function () {
    // console.log(UserService.user.events);
    // console.log(UserService.userEvents);
    return UserService.userEvents;
  };

}
