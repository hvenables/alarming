ionicApp.controller('SignInCtrl', function($scope, $state, $timeout) {

  $scope.signIn = function(user) {
    $state.go('tabs.myEvents');
  };
})
