ionicApp.controller('MapCtrl', function($scope, $ionicLoading) {

  // console.log(viewEventCtrl.userEvent.location);
  // console.log(viewEventCtrl.userEvent.location)


  $scope.mapCreated = function(map) {
    $scope.map = map;
  };

  $scope.centerOnMe = function () {
    console.log("Centering");
    if (!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log('Got pos', pos);
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      $scope.loading.hide();
      $scope.marker = new google.maps.Marker({
        position: {lat: pos.coords.latitude, lng: pos.coords.longitude},
        map: $scope.map,
        title: 'Hello World!'
      });
    }, function (error) {
      alert('Unable to get location: ' + error.message);
    });
  };


});
