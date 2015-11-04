ionicApp.controller('CreateEventCtrl', function($scope, $cordovaLocalNotification) {

  $scope.currentDate = new Date();
  $scope.time = new Date();

  $scope.createEvent = function() {
    var description = $scope.description;
    $scope.description = null;
    var title = $scope.title;
    $scope.title = null;
    var time = $scope.time;
    $scope.time = null;
    var currentDate = $scope.currentDate;
    $scope.currentDate = null;
    hours = time.getHours();
    minutes = time.getMinutes();
    currentDate.setHours(hours);
    currentDate.setMinutes(minutes);
    currentDate.setSeconds(00);
    var alarmTime = currentDate;

    var currentEvent = {
      title: title,
      description: description,
      datetime: alarmTime,
    };
    var events = {};

    $cordovaLocalNotification.schedule([{
      id: 1,
      title: currentEvent.title,
      text: currentEvent.description,
      at: currentEvent.datetime,
    },{
      id: 2,
      title: 'Hello',
      text: 'WTF',
      at: alarmTime,
    }]);
  };
});
