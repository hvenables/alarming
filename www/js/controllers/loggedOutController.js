ionicApp.controller('LoggedOutController', function ($state) {

  this.goTo = function (state) {
    $state.go(state);
  };

});
