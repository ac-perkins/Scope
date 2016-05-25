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
        }

        function logout() {
          var authObj = $firebaseAuth(ref);
          authObj.$unauth();
          userData = null;             
        }

      }

})();
