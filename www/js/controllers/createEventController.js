ionicApp.controller('CreateEventController', function($scope, $cordovaLocalNotification, $state, $firebase) {

  var self = this;

  var ref = new Firebase('https://event-alarm.firebaseio.com/events');
  var fb = $firebase(ref);

  var syncObject = fb.$asObject();

  syncObject.$bindTo($scope, 'events');

  self.calcDateTime = function(eventDate, eventTime) {
    eventDate.setHours(eventTime.getHours());
    eventDate.setMinutes(eventTime.getMinutes());
    eventDateTime = eventDate;
    return eventDateTime;
  };

  self.createEventHash = function(eventTitle, description, eventDateTime) {
    currentEvent = {
      eventTitle : eventTitle,
      description : description,
      dateTime : eventDateTime.toJSON()
    };
    return currentEvent;
  };

  self.createNotification = function(currentEvent){

    fb.$push(currentEvent);

    ref.on('value', function(events) {
      self.events = events.val();
      var eventID = 1;
      for (var key in self.events) {
        $cordovaLocalNotification.schedule([{
          id: eventID,
          title: self.events[key].eventTitle,
          text: self.events[key].description,
          at: Date.parse(self.events[key].dateTime),
        }]);
      }
    });
  };

  self.createEvent = function(eventTitle, description, eventDate, eventTime) {
    self.calcDateTime(eventDate, eventTime);
    self.createEventHash(eventTitle, description, eventDateTime);
    console.log(currentEvent);
    self.createNotification(currentEvent);
  };
});
