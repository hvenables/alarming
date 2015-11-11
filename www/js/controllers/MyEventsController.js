ionicApp.controller('MyEventsController', MyEventsController);

function MyEventsController(UserService) {

  this.userEvents = function () {
    return UserService.user.events;
  };

  this.attendeeList = function (userEvent) {
    return UserService.attendeeList(userEvent);
  }

}
