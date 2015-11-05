var ionicApp = angular.module('alarming', ['ionic', 'ngCordova', 'firebase']);

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

  $urlRouterProvider.otherwise('/logged-out');

  $stateProvider

  .state('loggedout', {
      url: '/logged-out',
      templateUrl: 'templates/logged-out.html',
      controller: 'LoggedOutCtrl',
  })


  .state('signin', {
      url: '/sign-in',
      templateUrl: 'templates/sign-in.html',
      controller: 'SignInCtrl',
    })

    .state('signup', {
      url: '/sign-up',
      templateUrl: 'templates/sign-up.html',
      controller: 'SignUpCtrl',
    })

    .state('forgotpassword', {
      url: '/forgot-password',
      templateUrl: 'templates/forgot-password.html',
    })

    .state('tabs', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html',
      controller: 'LoggedOutCtrl'
    })

    .state('tabs.createEvent', {
      url: '/event',
      views: {
        'event-tab': {
          templateUrl: 'templates/event.html',
          controller: 'CreateEventCtrl',
        }
      }
    })

    .state('tabs.myEvents', {
      url: '/my-events',
      views: {
        'my-events-tab': {
          templateUrl: 'templates/my-events.html',
          controller: 'MyEventsCtrl',
        }
      }
    });

});
