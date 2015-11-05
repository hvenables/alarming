ionicApp.controller('SignInCtrl', ['$rootScope', '$scope', '$state', '$firebaseAuth', function($rootScope, $scope, $state, $firebaseAuth) {

  var ref = new Firebase('https://blazing-fire-4780.firebaseio.com/alarming');
  $rootScope.auth = $firebaseAuth(ref);

  $scope.signIn = function (user) {
    ref.authWithPassword({
    email: user.email,
    password: user.password
  }, authHandler)};

  function authHandler(error, authData) {
    if (error) {
      console.log(error)
    } else {
      $state.go('tabs.myEvents');
    }
  };

}]);

ionicApp.controller('AlertCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
  $rootScope.alert = {};
}]);
