ionicApp.service('UserService', UserService);

function UserService($firebaseAuth, $firebaseObject) {

  var self = this;
  var ref = new Firebase('https://event-alarm.firebaseio.com/');

  $firebaseAuth(ref).$onAuth(function (auth) {
    if (auth) {
      self.user = $firebaseObject(ref.child('users').child(auth.uid));
    }
  });

  this.attendeeList = function (userEvent) {
    attendeeArray = [];
    for (var key in userEvent.attendees) {
      attendeeArray.push(userEvent.attendees[key]);
    }
    return attendeeArray.join(', ');
  }

}
