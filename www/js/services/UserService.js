ionicApp.service('UserService', UserService);

function UserService($firebaseAuth, $firebaseObject) {

  var self = this;
  var ref = new Firebase('https://event-alarm.firebaseio.com/');
  var usersRef = ref.child('users');

  $firebaseAuth(ref).$onAuth(function (auth) {
    self.user = auth ? $firebaseObject(usersRef.child(auth.uid)) : null;
  });

  self.attendeesAsArray = function (userEvent, isUserFirst) {
    var attArray = [];
    var specialKey = isUserFirst ? self.user.$id : userEvent.owner;
    for (var key in userEvent.attendees) {
      var attendee = userEvent.attendees[key];
      attendee.uid = key;
      (key === specialKey) ? attArray.unshift(attendee) : attArray.push(attendee);
    }
    return attArray;
  };

  self.attendeeList = function (userEvent, isUserFirst) {
    return self.attendeesAsArray(userEvent, isUserFirst).map(function (attendee) {
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
