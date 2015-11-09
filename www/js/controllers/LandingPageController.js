ionicApp.controller('LandingPageController', LandingPageController);

function LandingPageController($state) {

  this.go = function (state) {
    $state.go(state);
  };

}
