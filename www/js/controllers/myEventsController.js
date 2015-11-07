ionicApp.controller('MyEventsController', function($firebaseAuth, $firebaseObject, $cordovaLocalNotification) {

  var self = this;
  var ref = new Firebase('https://event-alarm.firebaseio.com/');

  var usersRef = ref.child('users');
  var eventsRef = ref.child('events');

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

  var eventId = window.location.hash.slice(11);
  var eventRef = new Firebase('https://event-alarm.firebaseio.com/events/'+ eventId);

  self.event = $firebaseObject(eventRef)
  eventRef.on("value", getUserId);

  function getUserId(snapshot) {
    self.event = snapshot.val();
    console.log('getUserId called');
    console.log(self.event);
  };

});
