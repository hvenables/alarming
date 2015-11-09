describe('SignInController', function() {

  beforeEach (angular.mock.module('alarming'));

  var ctrl, $scope;
  var authService;
  var q;
  // var MockFirebase = require('mockfirebase').MockFirebase;


  beforeEach(inject(function($controller, $rootScope, $q) {
    scope = $rootScope.$new();
    authService = jasmine.createSpyObj('authService', ['logIn']);
    q = $q;
    ctrl = $controller('SignInController', { authService: authService });
    authService.logIn.and.returnValue(q.when({"Just need to return object":"from the promise, this can be anything"}));
  }));

   it ('calls the auth service', function() {
     ctrl.signIn("Bat@bat.com");
     expect(authService.logIn).toHaveBeenCalled();
   });

});
