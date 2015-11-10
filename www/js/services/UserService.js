ionicApp.service('UserService', UserService);

function UserService($firebaseAuth, $firebaseArray) {

  var self = this;
  var ref = new Firebase('https://event-alarm.firebaseio.com/');

  $firebaseAuth(ref).$onAuth(function (authData) {
    if (authData) {

      self.uid = authData.uid;
      self.userRef = ref.child('users').child(self.uid);

      self.userEvents = $firebaseArray(self.userRef.child('events'));

      self.userEvents.$watch(function (data) {
        ref.child('events').child(data.key).once('value', function (snapshot) {
          var index = self.userEvents.$indexFor(data.key)
          self.userEvents[index] = snapshot.val();
        });
      });

      // self.userRef.on('value', function (snapshot) {
      //   self.userEvents = snapshot.val().events;
      //   for (var userEvent in self.userEvents) {
      //     ref.child('events').child(userEvent).once('value', function (snapshot) {
      //       self.userEvents[userEvent] = snapshot.val();
      //     });
      //   }
      // });
    }
  });

}
