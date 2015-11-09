ionicApp.controller('LoggedOutController', LoggedOutController);

function LoggedOutController($state) {

  this.go = function (state) {
    $state.go(state);
  };

}
