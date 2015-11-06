ionicApp.controller('SignInController', function($state, $firebaseAuth) {

  var self = this;

  self.test = "Hello"

  var ref = new Firebase('https://event-alarm.firebaseio.com/');

  self.signIn = function(user) {
    ref.authWithPassword({
      email: user.email,
      password: user.password
    }, authHandler);
  };

  function authHandler(error, authData) {
    if (error) {
      alert(error)
    } else {
      $state.go('tabs.myEvents');
    }
  };
});
