ionicApp.controller('SignInController', function (authService, $state) {

  var self = this;

  self.signIn = function (user) {
    authService.logIn(user).then(function () {
      $state.go('tabs.myEvents');
    }).catch(function (error) {
      alert(error);
    });
  };

});
