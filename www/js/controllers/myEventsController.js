ionicApp.controller('MyEventsController', function($firebase, $cordovaLocalNotification) {

  var self = this;

  var ref = new Firebase('https://event-alarm.firebaseio.com/events');
  ref.on('value', function(events) {
    self.eventsArray = [];
    self.events = events.val();
    for (var key in self.events) {
      self.eventsArray.push(self.events[key]);
    }
  });
});
