ionicApp.controller('MyEventsController', function (UserService, $firebaseObject) {

  var self = this;

  var ref = new Firebase('https://event-alarm.firebaseio.com/');

  self.userEvents = function () {
    console.log('userEvents called')
    return UserService.userEvents2;
  };

  var eventsRef = ref.child('events');
  var eventId = window.location.hash.slice(11);
  var eventRef = new Firebase('https://event-alarm.firebaseio.com/events/'+ eventId);

  self.event = $firebaseObject(eventRef)
  eventRef.on("value", getUserId);

  function getUserId(snapshot) {
    self.event = snapshot.val();
  };

});
