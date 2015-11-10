ionicApp.directive('map', function() {
  return {
    restrict: 'E',
    scope: {
      latlong: '=latlong',
      onCreate: '&'
    },
    link: function ($scope, $element, $attr) {
      function initialize() {

        var mapOptions = {
          center: new google.maps.LatLng($scope.latlong.lat, $scope.latlong.lng),
          zoom: 14,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map($element[0], mapOptions);

        var marker = new google.maps.Marker({
          position: {lat: $scope.latlong.lat, lng: $scope.latlong.lng},
          map: map,
          title: 'Hello World!'
        });

        $scope.onCreate({map: map});

        google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
          e.preventDefault();
          return false;
        });
      }

      if (document.readyState === "complete") {
        initialize();
      } else {
        google.maps.event.addDomListener(window, 'load', initialize);
      }
    }
  }
});
