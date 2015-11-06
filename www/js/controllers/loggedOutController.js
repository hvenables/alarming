ionicApp.controller('LoggedOutController', function($state, $firebaseAuth) {

  var self = this;

  self.test = "Hello"

  var ref = new Firebase('https://event-alarm.firebaseio.com/');

  self.signOut = function() {
    ref.unauth();
    $state.go('loggedout');
  };

  self.goToSignIn = function() {
    $state.go('signin');
  };

  self.goToSignUp = function() {
    $state.go('signup');
  };

});
