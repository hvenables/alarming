var ionicApp = angular.module('alarming', ['ionic', 'ngCordova']);

ionicApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

ionicApp.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/event')

  $stateProvider

  .state('createEvent', {
    url: '/event',
    templateUrl: 'templates/event.html',
    controller: 'CreateEventCtrl'
  })
})
