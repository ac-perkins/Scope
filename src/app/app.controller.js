(function() {
    'use strict';

    angular
      .module('app')
      .controller('AppController', AppController);

      AppController.$inject = ['$state', '$stateParams', '$sce', '$firebaseAuth'];
      function AppController($state, $stateParams, $sce, $firebaseAuth) {
        var that = this;
        this.authData = null;
        this.embeddedStream = $sce.trustAsResourceUrl("http://player.twitch.tv/?channel=");
        this.streamHeight = 360;
        this.streamWidth = 640;
        this.largeStream = false;

        this.changeStream = function changeStream(streamName) {
          console.log('in changeStream function');
          console.log(streamName);
          that.embeddedStream = $sce.trustAsResourceUrl("http://player.twitch.tv/?channel=" + streamName);
        };

        this.login = function login() {
          var ref = new Firebase("https://incandescent-heat-8431.firebaseio.com");
          ref.authWithOAuthPopup("google", function(error, authData) {
            if (error) {
              console.log("Login Failed!", error);
            } else {
              console.log("Authenticated successfully with payload:", authData);
              that.authData = authData;
              $state.transitionTo($state.current, $stateParams, {
                reload: true,
                inherit: false,
                notify: true
              });
            }
          });
        };

        this.logout = function logout() {
          var ref = new Firebase("https://incandescent-heat-8431.firebaseio.com");
          var authObj = $firebaseAuth(ref);
          authObj.$unauth();
          this.authData = null;               // TODO: put this inside unauth promise
        };

        this.theaterMode = function theaterMode() {
          this.largeStream = true;
          this.streamHeight = window.innerHeight * 0.8;
          this.streamWidth = window.innerWidth * 0.75;


        };

      }

})();
