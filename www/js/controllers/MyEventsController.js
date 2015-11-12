ionicApp.controller('MyEventsController', MyEventsController);

function MyEventsController(UserService, $state, $location) {

  var self = this;

  self.userEvents = function () {
    return UserService.user.events;
  };

  self.userId = function () {
    return UserService.user.$id;
  }

  self.attendeeList = function (userEvent) {
    return UserService.attendeeList(userEvent);
  }

  self.deleteEvent = function (eventId) {
    UserService.deleteEvent(eventId);
  }

  self.updateEvent = function (eventId) {
    $location.path('/update-event/' + eventId);
  }

}
