describe('SignUpController', function() {

  beforeEach (angular.mock.module('alarming'));

  var ctrl, $scope;

  var user = {
    "email": "Bat6@gmail.com"
  }

  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    ctrl = $controller('SignUpController', { $scope:$scope });
  }));

  // it ('testing the test file', function() {
  //   expect(ctrl.test).toEqual('Hello');
  // });


  // it('should save email addresses to the mock database', {
  //   MockFirebase.overide();
  //   users.listen();
  //   ctrl.signUp(user)
  // });


});
