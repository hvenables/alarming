describe('SignInController', function() {

  beforeEach (angular.mock.module('alarming'));

  var ctrl, $scope;

  var MockFirebase = require('mockfirebase').MockFirebase;


  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    ctrl = $controller('SignInController', { $scope:$scope });
  }));

////   it ('testing the test file', function() {
////     expect(ctrl.test).toEqual('Hello');
////   });
////
//    it ('successfully signs in user', function() {
//    ctrl.signIn("Bat");
//    expect(user).toBe('Bat');
//    });

});
