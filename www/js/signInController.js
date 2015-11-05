ionicApp.controller('SignInCtrl', [ '$rootScope', '$scope', '$state', '$firebaseAuth', function($rootScope, $scope, $state, $firebaseAuth) {

    var ref = new Firebase('https://blazing-fire-4780.firebaseio.com/alarming');
    $rootScope.auth = $firebaseAuth(ref);

    $scope.signIn = function (user) {
        ref.authWithPassword({
        email: user.email,
        password: user.password
      }, authHandler)};


    $scope.signUp = function() {
      $rootScope.auth.$createUser($scope.email, $scope.password, function(error, user) {
        if (!error) {
          $rootScope.alert.message = '';
        } else {
          $rootScope.alert.class = 'danger';
          $rootScope.alert.message = 'The username and password combination you entered is invalid.';
        }
      });

    }

      function authHandler(error, authData) {
        if (error) {
          console.log(error)
        } else {
          console.log(authData.password.email);
          $state.go('tabs.myEvents');
        }
      };
}]);

ionicApp.controller('AlertCtrl', [
'$scope', '$rootScope', function($scope, $rootScope) {
$rootScope.alert = {};

}

]);
