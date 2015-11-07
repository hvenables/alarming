ionicApp.controller('LoggedOutController', function($state) {

  var self = this;
  var ref = new Firebase('https://event-alarm.firebaseio.com/');

  self.goToSignIn = function() {
    $state.go('signin');
  };

  self.goToSignUp = function() {
    $state.go('signup');
  };

});
