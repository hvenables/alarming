describe('CreateEventController', function() {

  beforeEach (module('alarming'));

  var ctrl, $scope;

   // var currentUserId;

  jasmine.spyOn(ctrl.currentEvent, 'owner')
  .and
  .returnValue('Bat')

  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    ctrl = $controller('CreateEventController', { $scope:$scope });
  }));

  it ('should not have a time before event is created', function() {
    expect(ctrl.eventDateTime).toBeUndefined;
  });

  it ('should have a time after function is called', function() {
    eventDate = new Date(2015, 10, 6, 2, 3, 0, 000);
    eventTime = new Date(1970, 10, 1, 11, 5, 0, 000);
    expect(ctrl.calcDateTime(eventDate, eventTime)).toEqual(new Date(2015, 10, 6, 11, 5, 0, 000))
  });

  it ('should not have an event before one is created', function() {
     expect(ctrl.currentEvent).toBeUndefined;
  });

  it ('should be able to create an event', function() {
    eventDateTime = new Date(2015, 10, 6, 11, 5, 0, 000);
    eventTitle = "Bat's wedding";
    description = "Bat's big day";
    expect(ctrl.createEventHash(eventTitle, description, eventDateTime)).toEqual("Bat's big day")
  });

});
