(function() {
    'use strict';

    angular
      .module('app')
      .controller('StreamsController', StreamsController);

      StreamsController.$inject = ['$stateParams', 'TwitchService'];
      function StreamsController($stateParams, TwitchService) {
        console.log('$stateParams', $stateParams);
        var that = this;
        this.singleGameStreamsArray = null;
        this.noUserIcon = {img: 'http://s.jtvnw.net/jtv_user_pictures/hosted_images/GlitchIcon_WhiteonPurple.png'};
        this.errorMessage = "";

        TwitchService.getSingleGameStreams($stateParams.id, 10)
          .then(function(streams) {
            that.singleGameStreamsArray = streams;
          })
          .catch(function(err) {
            console.log('catch error', err);
            that.errorMessage = "Twitch is not responding to requests. Please try again shortly.";
          });



      }

})();
