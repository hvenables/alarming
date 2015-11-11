ionicApp.service('EventService', EventService);

function EventService($firebaseObject) {

  var self = this;
  var ref = new Firebase('https://event-alarm.firebaseio.com/');
  self.usersHash = $firebaseObject(ref.child('users'));
  self.attendeeHash = {};

  self.addToAttendeeHash = function (key, email) {
    self.attendeeHash[key] = {
      email: email,
      attending: false,
      late: false
    }
  };

  self.makeDateTime = function (date, time) {
    date.setHours(time.getHours());
    date.setMinutes(time.getMinutes());
    return date.toJSON();
  };

  self.createEventNode = function (newEvent) {
    return ref.child('events').push(newEvent);
  };

  self.updateUserNodes = function (eventRef, newEvent) {
    var eventObj = {};
    eventObj[eventRef.key()] = newEvent;
    for (key in self.attendeeHash) {
      ref.child('users').child(key).child('events').update(eventObj);
    }
  };

  self.createEventHash = function (title, description, date, time, postcode, latlong) {
    var owner = ref.getAuth();
    self.addToAttendeeHash(owner.uid, owner.password.email);
    var newEvent = {
      attendees: self.attendeeHash,
      dateTime: self.makeDateTime(date, time),
      description: description,
      eventTitle: title,
      id: new Date().valueOf(),
      location : latlong,
      owner: owner.uid,
      postcode : postcode,
    };
    var eventRef = self.createEventNode(newEvent);
    self.updateUserNodes(eventRef, newEvent);
    self.attendeeHash = {};
  };

}
