ionicApp.controller('SignUpCtrl', function($state, $firebaseAuth) {

  var ref = new Firebase('https://blazing-fire-4780.firebaseio.com/alarming');

  self.signUp = function(user) {
    ref.createUser({
      email: user.email,
      password: user.password
    }, signupHandler(user));
  };

  function logIn(user) {
    ref.authWithPassword({
      email: user.email,
      password: user.password
    }, authHandler);
  };

  function signupHandler(user) {
    return function (error, userData) {
      console.log(userData.uid);
      if (error) {
        console.log("Error creating user:", error);
      }
      else {
        console.log("Successfully created user account with uid:", userData.uid);
        logIn(user)
      }
    }
  };

  function authHandler(error, authData) {
    if (error) {
      console.log(error)
    }
    else {
      $state.go('tabs.myEvents');
    }
  };

});
