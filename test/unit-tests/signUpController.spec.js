describe('SignUpController', function() {

  beforeEach (angular.mock.module('alarming'));

  var ctrl, $scope;

  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    ctrl = $controller('SignUpController', { $scope:$scope });
  }));

  // it ('testing the test file', function() {
  //   expect(ctrl.test).toEqual('Hello');
  // });

});
