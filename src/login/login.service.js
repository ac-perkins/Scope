(function() {
    'use strict';

    angular
      .module('app')
      .factory('LoginService', LoginService);

      LoginService.$inject = ['$firebaseAuth'];
      function LoginService($firebaseAuth) {

        var ref = new Firebase("https://incandescent-heat-8431.firebaseio.com");
        var userData = null;

        return {
          login: login,
          userData: userData,
          logout: logout
        };

        function login() {
          return ref.authWithOAuthPopup("google")
            .then(function(authData) {
              console.log(authData);
              userData = authData;
              return userData;
            });
          // , function(error, authData) {
          //   if (error) {
          //     console.log("Login Failed!", error);
          //   } else {
          //     console.log("Authenticated successfully with payload:", authData);
          //     that.authData = authData;
          //     $state.transitionTo($state.current, $stateParams, {
          //       reload: true,
          //       inherit: false,
          //       notify: true
          //     });
          //   }
          // });
        }

        function logout() {
          var authObj = $firebaseAuth(ref);
          authObj.$unauth()
            .then(function removeAuth(data) {
              console.log('in service logout',data);
            });
          userData = null;               // TODO: put this inside unauth promise
        }

      }

})();
