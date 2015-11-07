ionicApp.controller('SignInController', function ($state, $firebaseAuth) {

  var self = this;
  var ref = new Firebase('https://event-alarm.firebaseio.com/');

  self.signIn = function (user) {
    $firebaseAuth(ref).$authWithPassword(user).then(function () {
      $state.go('tabs.myEvents');
    }).catch(function (error) {
      alert(error);
    });
  };

});
