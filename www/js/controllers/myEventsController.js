ionicApp.controller('MyEventsController', function($firebase) {

  var self = this;

  var ref = new Firebase('https://event-alarm.firebaseio.com/events');
  ref.on('value', function(eventsObject) {
    self.events = eventsObject.exportVal();
  })
});
