ionicApp.controller('SignUpController', function (authService, $state) {

  var self = this;

  self.signUp = function (user) {
    authService.signUp(user).then(function () {
      return authService.logIn(user);
    }).then(function () {
      $state.go('tabs.myEvents');
    }).catch(function (error) {
      alert(error);
    });
  };

});
