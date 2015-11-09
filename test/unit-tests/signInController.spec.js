describe('SignInController', function() {

  beforeEach (angular.mock.module('alarming'));

  var ctrl, $scope;

  var MockFirebase = require('mockfirebase').MockFirebase;


  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    ctrl = $controller('SignInController', { $scope:$scope });
    authService = jasmine.spyObj('authService', ['login']);
  }));


   // it ('calls the auth service', function() {
   // ctrl.signIn("Bat");
   // expect(user).toBe('Bat');
   // });

});
