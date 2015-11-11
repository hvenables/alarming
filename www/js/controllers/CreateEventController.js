ionicApp.controller('CreateEventController', CreateEventController);

function CreateEventController(EventService, $state, $http) {

  var self = this

  self.addToAttendeeHash = function (key, email) {
    EventService.addToAttendeeHash(key, email);
  };

  self.usersHash = EventService.usersHash;

  self.createEvent = function (title, description, date, time, postcode) {
    var eventPostcode = postcode.replace(/\s+/g, '');
    var url = 'http://api.postcodes.io/postcodes/' + eventPostcode;
    $http.get(url).success(function (data, status, headers, config) {
      latlong = {
        lat: data.result.latitude,
        lng: data.result.longitude
      };
      EventService.createEventHash(title, description, date, time, postcode, latlong);
      $state.go('tabs.myEvents');
    });
  };

}
