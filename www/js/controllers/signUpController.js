ionicApp.controller('SignUpController', function ($state, $firebaseAuth) {

  var self = this;
  var ref = new Firebase('https://event-alarm.firebaseio.com');

  self.signUp = function (user) {
    $firebaseAuth(ref).$createUser(user).then(function (userData) {
      saveNewUser(userData.uid, user.email);
      return $firebaseAuth(ref).$authWithPassword(user);
    }).then(function () {
      $state.go('tabs.myEvents');
    }).catch(function (error) {
      alert(error);
    });
  };

  function saveNewUser(uid, email) {
    ref.child('users/' + uid).set({
      email: email
    });
  };

});
