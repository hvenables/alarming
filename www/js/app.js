var ionicApp = angular.module('alarming', ['ionic', 'ngCordova', 'firebase']);

var self = this;

ionicApp.run(function($ionicPlatform, $cordovaLocalNotification, $interval, $cordovaGeolocation, $http, $firebaseObject) {
  $ionicPlatform.ready(function() {

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      StatusBar.styleDefault();
    }


    var ref = new Firebase('https://event-alarm.firebaseio.com/');
    var usersRef = new Firebase('https://event-alarm.firebaseio.com/users');
    var eventsRef = new Firebase('https://event-alarm.firebaseio.com/events');
    var currentUserId = usersRef.getAuth().uid;

    self.notification = function (currentEvent) {
      $cordovaLocalNotification.schedule({
        id: currentEvent.id,
        title: currentEvent.eventTitle,
        text: currentEvent.description,
        sound: "file://sounds/sucka.caf",
        at: Date.parse(currentEvent.dateTime)
      })
    }

    ref.child('events').on('value', function(events) {
      self.events = events.val();
      for (var key in self.events) {
        notification(self.events[key]);
      }
    });

    ref.onAuth(function() {
      currentUserId = usersRef.getAuth().uid;
      $http({
        method: 'GET',
        url: 'https://event-alarm.firebaseio.com/users/'+currentUserId+'.json'
      }).then(function successCallback(response) {
        var users = angular.fromJson(response.data);
        for(key in users.events){
          $http({
            method: 'GET',
            url: 'https://event-alarm.firebaseio.com/events/'+key+'.json'
          }).then(function successCallback(response) {
            var events = angular.fromJson(response.data);
            self.notification(events);
          })
        }
      });
    });
  });
});

ionicApp.filter('orderObjectBy', function() {
  return function(items, field, reverse) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {
      return (a[field] > b[field] ? 1 : -1);
    });
    if(reverse) filtered.reverse();
    return filtered;
  };
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
