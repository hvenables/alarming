ionicApp.service('UserService', UserService);

function UserService($firebaseAuth, $firebaseObject) {

  var self = this;
  var ref = new Firebase('https://event-alarm.firebaseio.com/');
  var usersRef = ref.child('users');

  $firebaseAuth(ref).$onAuth(function (auth) {
    if (auth) {
      self.user = $firebaseObject(usersRef.child(auth.uid));
    }
  });

  self.attendeesAsArray = function (userEvent) {
    var attendeeArray = [];
    for (var key in userEvent.attendees) {
      var attendee = userEvent.attendees[key];
      attendee.uid = key;
      if (key === userEvent.owner) {
        attendeeArray.unshift(attendee);
      } else {
        attendeeArray.push(attendee);
      }
    }
    return attendeeArray;
  };

  self.attendeeList = function (userEvent) {
    return self.attendeesAsArray(userEvent).map(function (attendee) {
      return attendee.email;
    }).join(', ');
  };

  self.deleteEvent = function (eventId) {
    var eventAttendees = self.user.events[eventId].attendees;
    for (key in eventAttendees) {
      var obj = $firebaseObject(usersRef.child(key).child('events').child(eventId));
      obj.$remove();
    }
    var obj = $firebaseObject(ref.child('events').child(eventId));
    obj.$remove();
  }

}
