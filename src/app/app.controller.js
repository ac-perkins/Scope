(function() {
    'use strict';

    angular
      .module('app')
      .controller('AppController', AppController);

      AppController.$inject = ['$state', '$stateParams', '$sce', '$window', 'LoginService'];
      function AppController($state, $stateParams, $sce, $window, LoginService) {
        var that = this;
        this.authData = null;
        this.embeddedStream = '';
        this.errorMessage = '';
        this.streamHeight = 405;
        this.streamWidth = 720;
        this.largeStream = false;


        this.changeStream = function changeStream(streamName) {
          console.log('in changeStream function');
          console.log(streamName);
          that.embeddedStream = $sce.trustAsResourceUrl('http://player.twitch.tv/?channel=' + streamName);
        };

        this.login = function login() {
          LoginService.login()
            .then(function getAuthData(data) {
              console.log('in login promise', data);
              that.authData = data;
              $state.transitionTo($state.current, $stateParams, {
                    reload: true,
                    inherit: false,
                    notify: true
                  });
            })
            .catch(function (err) {
              console.log('catch error', err);
              that.errorMessage = 'The server is not responding. Please try again shortly.';
            });
        };


        this.logout = function logout() {
          LoginService.logout();
          that.authData = null;
        };

        this.theaterMode = function theaterMode() {
          this.largeStream = true;
          this.streamWidth = window.innerWidth * 0.8;
          this.streamHeight = (this.streamWidth / 16) * 9;
          $('body').css({'background-color': '#333'});
          $('iframe').css({'display': 'block', 'margin': '0 auto'});
          $('.stream').css({'float': 'none', 'margin-top': '1%'});
        };

        this.defaultMode = function defaultMode() {
          this.streamHeight = 405;
          this.streamWidth = 720;
          this.largeStream = false;
          $('body').css('background-color', '#EFEEF7');
          $('.stream').css({'float': 'right', 'margin-top': '3%'});
        };

      }

})();
