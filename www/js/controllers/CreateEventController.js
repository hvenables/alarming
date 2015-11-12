ionicApp.controller('CreateEventController', CreateEventController);

function CreateEventController(EventService, $state, $http) {

  var self = this

  var attending = false;

  function uncheckall()  {
	  var ins = document.getElementsByTagName('input');
	  for (var i=0; i<ins.length; i++) {
  		if (ins[i].getAttribute('type') == 'checkbox') {
        ins[i].checked = false;
      }
		}
	}

  self.addToAttendeeHash = function (key, email) {
    EventService.addToAttendeeHash(key, email);
  };

  self.usersHash = EventService.usersHash;

  self.createEvent = function (title, description, date, time, postcode, sound) {
    var eventPostcode = postcode.replace(/\s+/g, '');
    var url = 'http://api.postcodes.io/postcodes/' + eventPostcode;
    $http.get(url).success(function (data, status, headers, config) {
      latlong = {
        lat: data.result.latitude,
        lng: data.result.longitude
      };
      EventService.createEventHash(title, description, date, time, postcode, latlong, sound);
      clearEvent();
      uncheckall()
      $state.go('tabs.myEvents');
    });
  };

  function clearEvent() {
    self.eventTitle = null;
    self.description = null;
    self.postcode = null;
    self.date = null;
    self.time = null;
    self.sound = null;
  };

}
