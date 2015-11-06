ionicApp.controller('LoggedOutController', function($state, $firebaseAuth) {

  var self = this;

  var ref = new Firebase('https://event-alarm.firebaseio.com/events');

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
