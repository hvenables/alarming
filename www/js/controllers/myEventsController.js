ionicApp.controller('MyEventsController', function($firebaseObject, $cordovaLocalNotification) {

  var self = this;

  self.test = "Hello"

  var usersRef = new Firebase('https://event-alarm.firebaseio.com/users');
  var eventsRef = new Firebase('https://event-alarm.firebaseio.com/events');

  var eventId = window.location.hash.slice(11);
  var eventRef = new Firebase('https://event-alarm.firebaseio.com/events/'+ eventId);

  self.event = $firebaseObject(eventRef)
  eventRef.on("value", getUserId);

  function getUserId(snapshot) {
    self.event = snapshot.val();
    console.log('getUserId called');
    console.log(self.event);
    console.log(self.event.owner)
  };

  usersRef.onAuth(function () {
    var user = usersRef.getAuth();
    if (user) {
      usersRef.child(user.uid).on('value', grabUserEvents);
      usersRef.child(user.uid).on('child_changed', grabUserEvents);
    }
  });

  function grabUserEvents(snapshot) {
    self.userEvents = snapshot.val().events;
    for (var eventId in self.userEvents) {
      eventsRef.child(eventId).once('value', function (snap2) {
        self.userEvents[eventId] = snap2.val();
      });
    }
  };
});
