ionicApp.controller('CreateEventCtrl', function($scope, $cordovaLocalNotification, $state, $firebase) {

  var ref = new Firebase('https://event-alarm.firebaseio.com/events');
  var fb = $firebase(ref);

  var syncObject = fb.$asObject();

  syncObject.$bindTo($scope, 'events');

  $scope.currentDate = new Date();
  $scope.time = new Date();

  $scope.createEvent = function() {
    var description = $scope.description;
    $scope.description = null;
    var eventTitle = $scope.eventTitle;
    $scope.eventTitle = null;
    var time = $scope.time;
    $scope.time = new Date();
    var currentDate = $scope.currentDate;
    $scope.currentDate = new Date();
    hours = time.getHours();
    minutes = time.getMinutes();
    currentDate.setHours(hours);
    currentDate.setMinutes(minutes);
    currentDate.setSeconds(00);
    var alarmTime = currentDate;

    var currentEvent = {
      eventTitle: eventTitle,
      description: description,
      datetime: alarmTime.toJSON(),
    };

    fb.$push(currentEvent);

    $cordovaLocalNotification.schedule([{
      id: 1,
      title: currentEvent.eventTitle,
      text: currentEvent.description,
      at: Date.parse(currentEvent.datetime),
    }]);
  };
});
