ionicApp.service('AuthService', AuthService);

function AuthService($firebaseAuth) {

  var ref = new Firebase('https://event-alarm.firebaseio.com/');
  var auth = $firebaseAuth(ref);

  this.logOut = function () {
    if (auth) ref.child('users').child(auth.$getAuth().uid).off();
    return auth.$unauth();
  };

  this.logIn = function (user) {
    return auth.$authWithPassword(user);
  };

  this.signUp = function (user) {
    return auth.$createUser(user).then(function (userData) {
      ref.child('users').child(userData.uid).set({ email: user.email });
    });
  };

}
