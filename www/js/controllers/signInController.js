ionicApp.controller('SignInController', function($state) {

  var self = this;

  self.signIn = function(user) {
    $state.go('tabs.myEvents');
  };
})
