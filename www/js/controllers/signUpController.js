ionicApp.controller('SignUpController', function($state, $firebaseAuth) {

  var self = this;

  self.test = "Hello"

  var ref = new Firebase('https://event-alarm.firebaseio.com');

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
      if (error) {
        alert("Error creating user:", error);
      }
      else {
        saveNewUser(userData.uid, user.email);
        logIn(user)
      }
    }
  };

  function authHandler(error, authData) {
    if (error) {
      alert(error)
    }
    else {
      $state.go('tabs.myEvents');
    }
  };

  function saveNewUser(userId, userEmail) {
    ref.child('users/'+userId).set({
      email: userEmail
    });
  };
});
