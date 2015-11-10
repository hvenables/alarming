ionicApp.service('UserService', UserService);

function UserService($firebaseAuth, $firebaseArray) {

  var self = this;
  var ref = new Firebase('https://event-alarm.firebaseio.com/');

  $firebaseAuth(ref).$onAuth(function (authData) {
    if (authData) {

      var userRef = ref.child('users').child(authData.uid);
      self.userEvents = $firebaseArray(userRef.child('events'));

      self.userEvents.$watch(function (data) {
        ref.child('events').child(data.key).once('value', function (snapshot) {
          var index = self.userEvents.$indexFor(data.key)
          self.userEvents[index] = snapshot.val();
        });
      });

    }
  });



}
