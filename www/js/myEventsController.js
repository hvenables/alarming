ionicApp.controller('MyEventsCtrl', function($scope, $state, $firebase) {


  var ref = new Firebase('https://event-alarm.firebaseio.com/events');
  $scope.eventsArray = []
  ref.on('value', function(events) {

    $scope.events = events.val();
    for(var key in $scope.events){
      $scope.eventsArray.push($scope.events[key]);
    }
  })
});
