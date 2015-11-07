ionicApp.controller('TabsController', function($state, $firebaseAuth) {

  var self = this;
  var ref = new Firebase('https://event-alarm.firebaseio.com/');

  self.signOut = function () {
    $firebaseAuth(ref).$unauth();
    $state.go('loggedout');
  };

});
