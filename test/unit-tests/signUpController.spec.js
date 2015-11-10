describe('SignUpController', function() {

  beforeEach (angular.mock.module('alarming'));

  var ctrl, $scope;
  var q;

  beforeEach(inject(function($controller, $rootScope, $q) {
    scope = $rootScope.$new();
    authService = jasmine.createSpyObj('authService', ['signUp']);
    q = $q;
    ctrl = $controller('SignUpController', { authService: authService });
    authService.signUp.and.returnValue(q.when({"dummy":"object"}));
  }));

  it('should call authService in Sign Up method', function() {
    ctrl.signUp("Bat@bat.com")
    expect(authService.signUp).toHaveBeenCalled();
  });


  // it('should save email addresses to the mock database', {
  //   MockFirebase.overide();
  //   users.listen();
  //   ctrl.signUp(user)
  // });


});
