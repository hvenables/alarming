ionicApp.controller('CreateEventController', function($state, $http, $firebaseObject) {

  var self = this;

  var eventsRef = new Firebase('https://event-alarm.firebaseio.com/events');
  var usersRef = new Firebase('https://event-alarm.firebaseio.com/users');

  self.models = {};
  self.attendeeArray = [];
  self.usersHash = $firebaseObject(usersRef);

  eventsRef.on('child_added', function (snapshot) {
    var ownerRef = usersRef.child(snapshot.val().owner);
    var attendeeArray = snapshot.val().attendees;
    var newNode = {};
    newNode[snapshot.key()] = snapshot.val().eventTitle;
    ownerRef.child('events').update(newNode);
    if (attendeeArray !== undefined) {
      for (var i = 0; i < attendeeArray.length; i++) {
        usersRef.child(attendeeArray[i] + '/events').update(newNode);
      }
    }
  });

  self.addToAttendeeArray = function(name){
    self.attendeeArray.push(name);
  };

  var currentUserId = eventsRef.getAuth();

  self.calcDateTime = function(eventDate, eventTime) {
    eventDate.setHours(eventTime.getHours());
    eventDate.setMinutes(eventTime.getMinutes());
    eventDateTime = eventDate;
    return eventDateTime;
  };

  self.createEventHash = function(eventTitle, description, eventDateTime, postcode, latlong) {
    var currentUserId = eventsRef.getAuth();
    currentEvent = {
      id : new Date().valueOf(),
      owner: currentUserId.uid,
      eventTitle : eventTitle,
      description : description,
      postcode : postcode,
      location : latlong,
      dateTime : eventDateTime.toJSON(),
      attendees: self.attendeeArray
    };
    self.attendeeArray = [];
    return currentEvent;
  };

  self.createNotification = function(currentEvent){
    eventsRef.push(currentEvent);
  };

  self.createEvent = function(eventTitle, description, eventDate, eventTime, postcode) {
    var eventPostcode = postcode.replace(/\s+/g, '');
    var url = 'http://api.postcodes.io/postcodes/' + eventPostcode
    $http.get(url).success(function(data, status, headers, config) {
      latlong = {
        lat :data.result.latitude,
        lng :data.result.longitude
      }
      self.calcDateTime(eventDate, eventTime);
      self.createEventHash(eventTitle, description, eventDateTime, postcode, latlong);
      self.createNotification(currentEvent);
      $state.go('tabs.myEvents')
    });
  };
});
