ionicApp.controller('SignUpCtrl', ['$rootScope', '$scope', '$state', '$firebaseAuth', function($rootScope, $scope, $state, $firebaseAuth) {

    var ref = new Firebase('https://blazing-fire-4780.firebaseio.com/alarming');
    $rootScope.auth = $firebaseAuth(ref);

    $scope.signUp = function(user) {
      ref.createUser({
        email: user.email,
        password: user.password
      }, signupHandler(user));
    };

      function logIn(user) {
          ref.authWithPassword({
            email: user.email,
            password: user.password
         }, authHandler);
      };

      function signupHandler(user) {
        return function (error, userData) {
          console.log(userData.uid);
          if (error) {
            switch (error.code) {
              case "EMAIL_TAKEN":
                console.log("The new user account cannot be created because the email is already in use.");
                break;
              case "INVALID_EMAIL":
                console.log("The specified email is not a valid email.");
                break;
              default:
                console.log("Error creating user:", error);
            }
          } else {
            console.log("Successfully created user account with uid:", userData.uid);
            ref.authWithPassword({
              email: user.email,
              password: user.password
           }, authHandler);
        }
      }
    }

    function authHandler(error, authData) {
      if (error) {
        console.log(error)
      } else {
        console.log("Logged in successfully as " + authData.password.email);
        $state.go('tabs.myEvents');
      }
    };

}]);
