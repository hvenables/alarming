describe('MyEventsController', function() {

  beforeEach (angular.mock.module('alarming'));

  var ctrl, $scope;
  var q;

  beforeEach(inject(function($controller, $rootScope, $q) {
    scope = $rootScope.$new();
    ctrl = $controller('MyEventsController', { $scope:$scope });
    // Firebase = function(){return {getAuth: function(){ return {uid: "Bat"} }, on: function(){} }}
    snapSpy = jasmine.createSpyObj('snapshot', ['val']);
    q = $q;
    snapshot.val.and.returnValue("bat")
  }));

  // describe('getUserId', function() {
  //   it('should call snapshot', function() {
  //     ctrl.getUserId(snapshot);
  //     expect(snapshot.val).toHaveBeenCalled();
  //   });
  // });


   // it('correctly identifies the users events', function() {
   //   expect(ctrl.grabUserEvents).toEqual("Bats Wedding")
   // })

    // authService.logIn.and.returnValue(q.when({"Just need to return object":"from the promise, this can be anything"}));
  // }));
});
