ionicApp.controller('CreateEventController', CreateEventController);

function CreateEventController(EventService, $state) {

  this.addToAttendeeHash = function (key, email) {
    EventService.addToAttendeeHash(key, email);
  };

  this.usersHash = EventService.usersHash;

  this.createEvent = function (title, description, date, time) {
    EventService.createEventHash(title, description, date, time);
    $state.go('tabs.myEvents')
  };

}
