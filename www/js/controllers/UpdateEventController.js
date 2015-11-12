ionicApp.controller('UpdateEventController', UpdateEventController);

function UpdateEventController(UserService, EventService, $state, $http) {

  var self = this;

  self.eventKey = window.location.hash.slice(19);
  self.usersHash = EventService.usersHash;

  self.userEvent = function () {
    return UserService.user.events[self.eventKey];
  };

  function setData() {
    self.eventTitle = self.userEvent().eventTitle;
    self.description = self.userEvent().description;
    self.postcode = self.userEvent().postcode;
    self.sound = self.userEvent().sound
  };
  setData();

  self.addToAttendeeHash = function (key, email) {
    EventService.addToAttendeeHash(key, email);
  };

  self.updateEvent = function (title, description, date, time, postcode, sound) {
    var url = 'http://api.postcodes.io/postcodes/' + postcode.replace(/\s+/g, '');
    $http.get(url).success(function (data) {
      var latlong = { lat: data.result.latitude, lng: data.result.longitude };
      console.log(self.eventKey);
      EventService.updateEventHash(title, description, date, time, postcode, latlong, sound, self.eventKey);
      $state.go('tabs.myEvents');
    });

  };

};
