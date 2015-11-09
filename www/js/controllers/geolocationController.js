ionicApp.controller('CreateEventController', function($cordovaGeolocation) {

  var self = this;

  self.distance = "";
  self.ownLat = "";
  self.ownLong = "";

  var posOptions = {timeout: 5000, enableHighAccuracy: true};

  $interval(function(){
   $cordovaGeolocation.getCurrentPosition(posOptions)
   .then(function(position){
                var lat  = position.coords.latitude;
                self.ownLat = lat;
                var long = position.coords.longitude;
                self.ownLong = long;
                var newLocation = {'lon': long, 'lat': lat };
                console.log(newLocation);

    })
  }, 10000);
}
