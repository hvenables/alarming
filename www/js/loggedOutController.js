ionicApp.controller('LoggedOutCtrl', function($scope, $state, $firebaseAuth) {

  var ref = new Firebase('https://blazing-fire-4780.firebaseio.com/alarming');

//$scope.$on('$viewContentLoaded', function() {
//   //call it here
//    ref.unauth();
//    console.log('logged out')
//});

  $scope.init = function() {
    ref.unauth();
    console.log('logged out')
  };

  $scope.goToSignIn = function() {
    $state.go('signin');
  };

  $scope.goToSignUp = function() {
    $state.go('signup');
  };

  $scope.init();
});
