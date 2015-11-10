describe('CreateEventController', function() {
  beforeEach(angular.mock.module('alarming'));

  var ctrl, $scope;

  var currentEvent = {
    // id : new Date().valueOf(),
    id: '123',
    owner: 'Bat',
    eventTitle : "Bat's Wedding",
    description : "Bat's big day",
    // dateTime : eventDateTime.toJSON()
    dateTime : new Date(2015, 10, 6, 2, 3,0,000).toJSON()
  };

  beforeEach(inject(function($controller, $rootScope) {
    Firebase = function(){return  { getAuth: function(){ return { uid: "Bat" } }, on:  function(){} }}
    scope = $rootScope.$new();
    ctrl = $controller('CreateEventController', { $scope:$scope });
  }));

  it ('should not have a time before event is created', function() {
    expect(ctrl.eventDateTime).toBeUndefined;
  });

  it ('should have a time after function is called', function() {
    eventDate = new Date(2015, 10, 6, 2, 3, 0, 000);
    eventTime = new Date(1970, 10, 1, 11, 5, 0, 000);
    expect(ctrl.calcDateTime(eventDate, eventTime)).toEqual(new Date(2015, 10, 6, 11, 5, 0, 000));
  });

  it('should not have an event before one is created', function() {
    expect(ctrl.currentEvent).toBeUndefined;
  });

  it('should add an attendee to the attendees array', function() {
    name = "Bat";
    ctrl.addToAttendeeArray(name);
    expect(ctrl.attendeeArray).toEqual(["Bat"])
  });

  // it ('should be able to create an event', function() {
  //   // id = '123'
  //   eventDateTime = new Date(2015, 10, 6, 11, 5, 0, 000);
  //   eventTitle = "Bat's wedding";
  //   description = "Bat's big day";
  //   expect(ctrl.createEventHash(eventTitle, description, eventDateTime)).toEqual(currentEvent)
  // });

  // describe('attendeeArray', function() {
  //   it('should be array', function() {
  //     expect(ctrl.attendeeArray).toBeUndefined;
  //   });
  // });

});
