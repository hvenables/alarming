ionicApp.service('UserService', UserService);

function UserService($firebaseAuth, $firebaseObject) {

  var self = this;
  var ref = new Firebase('https://event-alarm.firebaseio.com/');

  $firebaseAuth(ref).$onAuth(function (auth) {
    if (auth) {
      self.user = $firebaseObject(ref.child('users').child(auth.uid));
    }
  });

  self.attendeeList = function (userEvent) {
    attendeeArray = [];
    for (var key in userEvent.attendees) {
      attendeeArray.push(userEvent.attendees[key].email);
    }
    return attendeeArray.join(', ');
  }

  self.deleteEvent = function (eventId) {
    console.log('about to zap event ' + eventId);
    var eventAttendees = self.user.events[eventId].attendees;
    for (key in eventAttendees) {
      console.log(eventAttendees[key] + ' needs to be updated');
      var obj = $firebaseObject(ref.child('users').child(key).child('events').child(eventId));
      obj.$remove();
    }
    var obj = $firebaseObject(ref.child('events').child(eventId))
    obj.$remove();
  }

}
