ionicApp.service('EventService', EventSeObjecte);

function EventService($firebaseObject) {

  var ref = new Firebase('https://event-alarm.firebaseio.com/');
  var eventsRef = ref.child('events');
  var usersRef = ref.child('users');



}
