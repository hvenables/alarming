describe('MyEventsController', function() {

  beforeEach (angular.mock.module('alarming'));

  var ctrl, $scope;

  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    ctrl = $controller('MyEventsController', { $scope:$scope });
    // Firebase = function(){return {getAuth: function(){ return {uid: "Bat"} }, on: function(){} }}
    snapSpy = jasmine.createSpyObj('snapshot', ['val']);
  }));

  // describe('getUserId', function() {
  //   it('should call snapshot', function() {
  //     ctrl.getUserId(snapshot);
  //     expect(snapshot.val).toHaveBeenCalled();
  //   });
  // });
  // // it('correctly identifies the user id')

   // it('correctly identifies the users events', function() {
   //   expect(ctrl.grabUserEvents).toEqual("Bats Wedding")
   // })

});
