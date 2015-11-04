// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var ionicApp = angular.module('starter', ['ionic', 'ngCordova']);

ionicApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

ionicApp.controller('ExampleController', function($scope, $cordovaLocalNotification) {

  $scope.currentDate = new Date();
  $scope.time = new Date();

  $scope.add = function() {
    var message = $scope.message;
    $scope.message = null;
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
      message: message,
      datetime: alarmTime,
    };
    var events = {};

    $cordovaLocalNotification.schedule([{
      id: 1,
      title: currentEvent.title,
      text: currentEvent.message,
      at: currentEvent.datetime,
    },{
      id: 2,
      title: 'Hello',
      text: 'WTF',
      at: alarmTime,
    }]);
  };
});
