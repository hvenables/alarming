ionicApp.controller('UpdateEventController', UpdateEventController);

function UpdateEventController(UserService) {

  var self = this;

  self.userEvent = function () {
    return UserService.user.events[window.location.hash.slice(19)];
  };

  function setData() {
    self.eventTitle = self.userEvent().eventTitle;
    self.description = self.userEvent().description;
    self.postcode = self.userEvent().postcode;
  };
  setData();
};
