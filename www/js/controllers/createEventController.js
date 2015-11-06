ionicApp.controller('CreateEventController', function($cordovaLocalNotification, $state, $firebaseObject) {

  var self = this;

  var eventsRef = new Firebase('https://event-alarm.firebaseio.com/events');
  var usersRef = new Firebase('https://event-alarm.firebaseio.com/users');

  self.models = {};
  self.attendeeArray = [];
  self.usersHash = $firebaseObject(usersRef);

  eventsRef.on('child_added', function (snapshot) {
    var ownerRef = usersRef.child(snapshot.val().owner);
    var newNode = {};
    newNode[snapshot.key()] = snapshot.val().eventTitle;
    ownerRef.child('events').update(newNode);
  });

  self.addToAttendeeArray = function(name){
    self.attendeeArray.push(name);
    console.log(self.attendeeArray)
  };

  self.calcDateTime = function(eventDate, eventTime) {
    eventDate.setHours(eventTime.getHours());
    eventDate.setMinutes(eventTime.getMinutes());
    eventDateTime = eventDate;
    return eventDateTime;
  };

  self.createEventHash = function(eventTitle, description, eventDateTime) {
    var currentUserId = eventsRef.getAuth();
    currentEvent = {
      id : new Date().valueOf(),
      owner: currentUserId.uid,
      eventTitle : eventTitle,
      description : description,
      dateTime : eventDateTime.toJSON(),
      attendees: self.attendeeArray
    };
    return currentEvent;
  };

  self.createNotification = function(currentEvent){
    eventsRef.push(currentEvent);
  };

  self.createEvent = function(eventTitle, description, eventDate, eventTime) {
    self.calcDateTime(eventDate, eventTime);
    self.createEventHash(eventTitle, description, eventDateTime);
    self.createNotification(currentEvent);
    $state.go('tabs.myEvents')
  };
});
