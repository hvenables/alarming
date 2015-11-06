ionicApp.controller('LoggedOutController', function($state, $firebaseAuth) {

  var self = this;

  var ref = new Firebase('https://blazing-fire-4780.firebaseio.com/alarming');

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
