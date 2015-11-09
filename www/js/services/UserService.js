ionicApp.service('UserService', UserService);

function UserService($firebaseAuth, $firebaseArray) {

  var self = this;

  var ref = new Firebase('https://event-alarm.firebaseio.com/');

  $firebaseAuth(ref).$onAuth(function (authData) {
    if (authData) {
      self.uid = authData.uid;
      self.userRef = ref.child('users').child(self.uid);

      self.userEventsRef = self.userRef.child('events')
      self.userEvents2 = $firebaseArray(self.userEventsRef);
      self.userEvents2.$loaded(function (data) {
        console.log(data)
        angular.forEach(data, function(value, key) {
          console.log(key, value);
       });
      });
      self.userEvents2.$watch(function (thing) {
        for (var userEvent of self.userEvents2) {
          console.log('userEvent ', userEvent);
          ref.child('events').child(userEvent.$id).once('value', function (snapshot) {
            console.log(snapshot.val());
            // self.userEvents2[userEvent.key()] = snapshot.val();
          });
        }
      });

      self.userRef.on('value', function (snapshot) {
        self.userEvents = snapshot.val().events;
        for (var userEvent in self.userEvents) {
          ref.child('events').child(userEvent).once('value', function (snapshot) {
            self.userEvents[userEvent] = snapshot.val();
          });
        }
      });
    }
  });

  self.getUserEvents = function () {
    return self.userEvents;
  };

}
