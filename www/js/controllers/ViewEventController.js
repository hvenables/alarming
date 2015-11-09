ionicApp.controller('ViewEventController', ViewEventController);

function ViewEventController($firebaseObject) {

  var self = this;

  var eventsRef = new Firebase('https://event-alarm.firebaseio.com/events');
  var eventRef = eventsRef.child(window.location.hash.slice(13));

  self.userEvent = $firebaseObject(eventRef);

  eventRef.on('value', function (snapshot) {
    self.userEvent = snapshot.val();
  });

}
