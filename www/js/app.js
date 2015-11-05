var ionicApp = angular.module('alarming', ['ionic', 'ngCordova', 'firebase']);

var self = this;

ionicApp.run(function($ionicPlatform, $cordovaLocalNotification) {
  $ionicPlatform.ready(function() {

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      StatusBar.styleDefault();
    }

    var ref = new Firebase('https://event-alarm.firebaseio.com/events');
    ref.on('value', function(events) {
      self.events = events.val();
      var eventID = Math.random();
      for (var key in self.events) {
        console.log(self.events[key].eventTitle);
        $cordovaLocalNotification.schedule({
          id: eventID,
          title: self.events[key].eventTitle,
          text: self.events[key].description,
          at: Date.parse(self.events[key].dateTime),
          autoCancel: true,
        }).then(function(result) {
        });
      }
    });

  });
});

ionicApp.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/logged-out');

  $stateProvider

  .state('loggedout', {
     url: '/logged-out',
     templateUrl: 'templates/logged-out.html',
     controller: 'LoggedOutController as LoggedOutCtrl',
 })

  .state('signin', {
    url: '/sign-in',
    templateUrl: 'templates/sign-in.html',
    controller: 'SignInController as SignInCtrl',
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
    controller: 'LoggedOutController as LoggedOutCtrl'
  })

  .state('tabs.createEvent', {
    url: '/event',
    views: {
      'event-tab': {
        templateUrl: 'templates/create-event.html',
        controller: 'CreateEventController as CreateEventCtrl',
      }
    }
  })

  .state('tabs.myEvents', {
    url: '/my-events',
    views: {
      'my-events-tab': {
        templateUrl: 'templates/my-events.html',
        controller: 'MyEventsController as MyEventsCtrl',
      }
    }
  });
});
