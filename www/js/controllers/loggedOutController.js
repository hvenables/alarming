ionicApp.controller('LoggedOutController', function ($state) {

  var self = this;

  self.go = function (state) {
    $state.go(state);
  };

});
