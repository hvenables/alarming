ionicApp.controller('MyEventsController', function (UserService, $firebaseObject) {

  var self = this;

  var ref = new Firebase('https://event-alarm.firebaseio.com/');

  self.userEvents2 = UserService.userEvents2;

  self.userEvents3 = {
    key0: {eventTitle: 'title0'},
    key1: {eventTitle: 'title1'},
    key2: {eventTitle: 'title2'},
  };

  self.userEvents = function () {
    console.log('userEvents called')
    return UserService.userEvents;
  };

  var eventsRef = ref.child('events');
  var eventId = window.location.hash.slice(11);
  var eventRef = new Firebase('https://event-alarm.firebaseio.com/events/'+ eventId);

  self.event = $firebaseObject(eventRef)
  eventRef.on("value", getUserId);

  function getUserId(snapshot) {
    self.event = snapshot.val();
    // console.log('getUserId:');
    // console.log(self.event);
  };

});
