ionicApp.controller('SignUpController', function($state, $firebaseAuth) {

  var self = this;
  var ref = new Firebase('https://event-alarm.firebaseio.com');

  self.signUp = function (user) {
    $firebaseAuth(ref).$createUser(user).then(function (userData) {
      saveNewUser(userData.uid, user.email);
      logIn(user);
    }).catch(function (error) {
      alert(error);
    });
  };

  function saveNewUser(userId, userEmail) {
    ref.child('users/'+userId).set({
      email: userEmail
    });
  };

  function logIn(user) {
    $firebaseAuth(ref).$authWithPassword(user).then(function () {
      $state.go('tabs.myEvents');
    }).catch(function (error) {
      alert(error);
    });
  };

});
