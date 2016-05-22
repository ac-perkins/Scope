(function() {
    'use strict';

    angular
      .module('app')
      .controller('StreamsController', StreamsController);

      StreamsController.$inject = ['$state', '$stateParams', 'TwitchService'];
      function StreamsController($state, $stateParams, TwitchService) {
        console.log('$stateParams', $stateParams);
        var that = this;
        this.singleGameStreamsArray = null;
        this.noUserIcon = {img: 'http://s.jtvnw.net/jtv_user_pictures/hosted_images/GlitchIcon_WhiteonPurple.png'};
        this.errorMessage = "";

        TwitchService.getSingleGameStreams($stateParams.id, 10)
          .then(function(streams) {
            console.log(streams);
            if (streams.length === 0) {
              $state.go('home');
            } else {
              that.singleGameStreamsArray = streams;
            }
          })
          .catch(function(err) {
            console.log('catch error', err);
            that.errorMessage = "Twitch is not responding to requests. Please try again shortly.";
          });



      }

})();
