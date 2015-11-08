ionicApp.service('authService', function ($firebaseAuth) {

  const ref = new Firebase('https://event-alarm.firebaseio.com/');
  const auth = $firebaseAuth(ref);

  this.logOut = function () {
    return auth.$unauth();
  };

  this.logIn = function (user) {
    return auth.$authWithPassword(user);
  };

  this.signUp = function (user) {
    return auth.$createUser(user).then(function (userData) {
      ref.child('users/' + userData.uid).set({ email: user.email });
    });
  };

});
