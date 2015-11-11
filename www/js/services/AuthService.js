ionicApp.service('AuthService', AuthService);

function AuthService($firebaseAuth) {

  var self = this;

  var ref = new Firebase('https://event-alarm.firebaseio.com/');
  var auth = $firebaseAuth(ref);

  self.logOut = function () {
    if (auth) ref.child('users').child(auth.$getAuth().uid).off();
    return auth.$unauth();
  };

  self.logIn = function (user) {
    return auth.$authWithPassword(user);
  };

  self.signUp = function (user) {
    return auth.$createUser(user).then(function (userData) {
      ref.child('users').child(userData.uid).set({ email: user.email });
    });
  };

}
