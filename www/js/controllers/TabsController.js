ionicApp.controller('TabsController', TabsController);

function TabsController(AuthService, $state) {

  this.signOut = function () {
    AuthService.logOut();
    $state.go('landingpage');
  };

}
