ionicApp.controller('CreateEventController', function($cordovaGeolocation) {

  var self = this;

  var currentUserId = eventsRef.getAuth();
  var usersRef = new Firebase('https://event-alarm.firebaseio.com/users');

  var posOptions = {timeout: 5000, enableHighAccuracy: true};

  self.getLocation = function(){
    $interval(function(){
     $cordovaGeolocation.getCurrentPosition(posOptions)
     .then(function(position){
                  var lat  = position.coords.latitude;
                  var long = position.coords.longitude;
                  location = [lat, long];
                  self.updateLocation(location);
      })
    }, 10000);
  }

  self.updateLocation = function(location) {
    usersRef.child(currentUserId).set({
      location: location
    });
  };
}
