var ionicApp = angular.module('alarming', ['ionic', 'ngCordova', 'firebase']);

var self = this;

ionicApp.run(function($ionicPlatform, $cordovaLocalNotification, $interval, $cordovaGeolocation, $firebaseAuth, $firebaseObject, $location, UserService) {
  $ionicPlatform.ready(function() {

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      StatusBar.styleDefault();
    }

    var ref = new Firebase('https://event-alarm.firebaseio.com/');
    var eventsRef = new Firebase('https://event-alarm.firebaseio.com/events');
    var usersRef = new Firebase('https://event-alarm.firebaseio.com/users');

    self.eventsHash = $firebaseObject(eventsRef);

    ref.onAuth(function(auth) {
      if(auth){
        self.currentUserId = auth.uid;
      }
    });

    usersRef.child(self.currentUserId).on('value', function(userData) {
      self.events = userData.val().events;
      for (var key in self.events) {
        if(self.events[key].id > (Date.parse(new Date)-1000)){
          initialNotification(self.events[key])
        };
        notification(self.events[key]);
      };
    });

    function notification(currentEvent) {
      $cordovaLocalNotification.schedule([{
        id: currentEvent.id,
        title: currentEvent.eventTitle,
        text: currentEvent.description,
        sound: "file://sounds/sucka.mp3",
        at: Date.parse(currentEvent.dateTime)
      },{
        id: 1,
        title: "You have been invited to an event",
        at: ((Date.parse(new Date)) + 20000)
      }]);
    };

    window.cordova.plugins.notification.local.on("click", function (notification) {
      for (var key in UserService.user.events) {
        if (UserService.user.events[key].id == notification.id){
          $location.path('/tab/view-event/'+key);
        }
      }
    });
  });
});

ionicApp.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider

  .state('landingpage', {
     url: '/',
     templateUrl: 'templates/landing-page.html',
     controller: 'LandingPageController as landingPageCtrl'
 })

  .state('signin', {
    url: '/sign-in',
    templateUrl: 'templates/sign-in.html',
    controller: 'SignInController as signInCtrl'
  })

  .state('signup', {
    url: '/sign-up',
    templateUrl: 'templates/sign-up.html',
    controller: 'SignUpController as signUpCtrl'
  })

  .state('forgotpassword', {
    url: '/forgot-password',
    templateUrl: 'templates/forgot-password.html'
  })

  .state('tabs', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'TabsController as tabsCtrl'
  })

  .state('tabs.createEvent', {
    url: '/event',
    views: {
      'event-tab': {
        templateUrl: 'templates/create-event.html',
        controller: 'CreateEventController as createEventCtrl'
      }
    }
  })

  .state('tabs.updateEvent', {
    url: '/update-event/:key',
    views: {
      'event-tab': {
        templateUrl: 'templates/update-event.html',
        controller: 'UpdateEventController as updateEventCtrl'
      }
    }
  })

  .state('tabs.myEvents', {
    url: '/my-events',
    views: {
      'my-events-tab': {
        templateUrl: 'templates/my-events.html',
        controller: 'MyEventsController as myEventsCtrl'
      }
    }
  })

  .state('tabs.viewEvent', {
    url: '/view-event/:key',
    views: {
      'my-events-tab': {
        templateUrl: 'templates/view-event.html',
        controller: 'ViewEventController as viewEventCtrl'
      }
    }
  });
});
