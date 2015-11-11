ionicApp.controller('MyEventsController', MyEventsController);

function MyEventsController(UserService) {

  this.userEvents = function () {
    return UserService.user.events;
  };

  this.userId = function () {
    return UserService.user.$id;
  }

  this.attendeeList = function (userEvent) {
    return UserService.attendeeList(userEvent);
  }

  this.deleteEvent = function () {
    console.log('Delete Event has been clicked.');
  }

}
