ionicApp.controller('MyEventsController', MyEventsController);

function MyEventsController(UserService) {

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

  self.testView = function (eventId) {
    console.log('testView ' + eventId);
  }

  self.listCanSwipe = true;
}
