ionicApp.controller('MyEventsCtrl', function($scope, $firebase) {

  var ref = new Firebase('https://event-alarm.firebaseio.com/events');
  ref.on('value', function(events) {
    $scope.eventsArray=[]
    $scope.events = events.val();
    for(var key in $scope.events){
      $scope.eventsArray.push($scope.events[key]);
    }
  })
});
