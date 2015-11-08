ionicApp.controller('TabsController', function (authService, $state) {

  var self = this;

  self.signOut = function () {
    authService.logOut();
    $state.go('loggedout');
  };

});
