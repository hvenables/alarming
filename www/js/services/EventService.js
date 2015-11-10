ionicApp.service('EventService', EventService);

function EventService($firebaseObject) {

  var self = this;
  var ref = new Firebase('https://event-alarm.firebaseio.com/');
  self.usersHash = $firebaseObject(ref.child('users'));
  self.attendeeHash = {};

  self.addToAttendeeHash = function (key, email) {
    self.attendeeHash[key] = email;
  };

  self.createEventHash = function (title, description, date, time) {
    var owner = ref.getAuth();
    self.addToAttendeeHash(owner.uid, owner.password.email);
    var newEvent = {
      attendees: self.attendeeHash,
      dateTime: self.makeDateTime(date, time),
      description: description,
      eventTitle: title,
      id: new Date().valueOf(),
      owner: owner.uid
    };
    var eventRef = self.createEventNode(newEvent);
    self.updateUserNodes(eventRef, title);
    self.attendeeHash = {};
  };

  self.makeDateTime = function (date, time) {
    date.setHours(time.getHours());
    date.setMinutes(time.getMinutes());
    return date.toJSON();
  };

  self.createEventNode = function (newEvent) {
    return ref.child('events').push(newEvent);
  };

  self.updateUserNodes = function (eventRef, title) {
    var eventObj = {};
    eventObj[eventRef.key()] = title;
    for (key in self.attendeeHash) {
      ref.child('users').child(key).child('events').update(eventObj);
    }
  };

}
