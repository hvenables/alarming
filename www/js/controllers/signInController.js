ionicApp.controller('SignInController', SignInController);

function SignInController(AuthService, $state) {

  this.signIn = function (user) {
    AuthService.logIn(user).then(function () {
      $state.go('tabs.myEvents');
    }).catch(function (error) {
      alert(error);
    });
  };

}
