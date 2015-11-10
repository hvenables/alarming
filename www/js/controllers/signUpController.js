ionicApp.controller('SignUpController', SignUpController);


function SignUpController(AuthService, $state) {
  this.signUp = function (user) {
    AuthService.signUp(user).then(function () {
      return AuthService.logIn(user);
    }).then(function () {
      $state.go('tabs.myEvents');
    }).catch(function (error) {
      alert(error);
    });
  };

}
