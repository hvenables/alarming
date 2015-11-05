ionicApp.controller('SignInController', function($state, $firebaseAuth) {

  var self = this;

  var ref = new Firebase('https://blazing-fire-4780.firebaseio.com/alarming');

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
