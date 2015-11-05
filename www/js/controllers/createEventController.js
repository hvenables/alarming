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

    $cordovaLocalNotification.schedule([{
      id: 1,
      title: currentEvent.eventTitle,
      text: currentEvent.description,
      at: Date.parse(currentEvent.eventDateTime),
    }]);
  };

  self.createEvent = function(eventTitle, description, eventDate, eventTime) {
    self.calcDateTime(eventDate, eventTime);
    self.createEventHash(eventTitle, description, eventDateTime);
    console.log(currentEvent);
    self.createNotification(currentEvent);
  };
});
