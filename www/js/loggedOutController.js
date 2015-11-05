ionicApp.controller('LoggedOutCtrl', function($scope, $state, $firebaseAuth) {

  var ref = new Firebase('https://blazing-fire-4780.firebaseio.com/alarming');

  ref.onAuth(function (authData) {
    if (authData) {
      console.log('logged in as ' + authData.password.email);
    } else {
      console.log('user logged out')
    }
  });

  $scope.init = function() {
    ref.unauth();
    $state.go('loggedout');
  };

  $scope.goToSignIn = function() {
    $state.go('signin');
  };

  $scope.goToSignUp = function() {
    $state.go('signup');
  };

});
