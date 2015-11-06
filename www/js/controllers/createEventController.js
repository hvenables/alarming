ionicApp.controller('CreateEventController', function($scope, $cordovaLocalNotification, $state, $firebase) {

  var self = this;

  var eventsRef = new Firebase('https://event-alarm.firebaseio.com/events');
  var usersRef = new Firebase('https://event-alarm.firebaseio.com/users');

  var currentUserId = eventsRef.getAuth().uid

  eventsRef.on('child_added', function (snapshot) {
    var ownerRef = usersRef.child(snapshot.val().owner);
    var newNode = {};
    newNode[snapshot.key()] = snapshot.val().eventTitle;
    ownerRef.child('events').update(newNode);
  });

  self.calcDateTime = function(eventDate, eventTime) {
    eventDate.setHours(eventTime.getHours());
    eventDate.setMinutes(eventTime.getMinutes());
    eventDateTime = eventDate;
    return eventDateTime;
  };

  self.createEventHash = function(eventTitle, description, eventDateTime) {
    currentEvent = {
      id : new Date().valueOf(),
      owner: currentUserId,
      eventTitle : eventTitle,
      description : description,
      dateTime : eventDateTime.toJSON()
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
