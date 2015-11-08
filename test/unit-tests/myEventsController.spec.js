describe('MyEventsController', function() {

  beforeEach (angular.mock.module('alarming'));

  var ctrl, $scope;

  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    ctrl = $controller('MyEventsController', { $scope:$scope });
  }));

  // it ('testing the test file', function() {
  //   expect(ctrl.test).toEqual('Hello');
  // });

  // it ('correctly identifies the users events', function() {
  //   expect(ctrl.grabUserEvents).toEqual("Bats Wedding")
  // })



});
