ionicApp.controller('SignInController', function($state, $firebaseAuth) {

  var self = this;

  var ref = new Firebase('https://event-alarm.firebaseio.com/events');

  self.signIn = function (user) {
    ref.authWithPassword({
      email: user.email,
      password: user.password
    }, authHandler);
  };

  function authHandler(error, authData) {
    if (error) {
      console.log(error)
    } else {
      $state.go('tabs.myEvents');
    }
  };
});
