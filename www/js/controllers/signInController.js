ionicApp.controller('SignInCtrl', function($scope, $state) {

  $scope.signIn = function(user) {
    $state.go('tabs.myEvents');
  };
})
