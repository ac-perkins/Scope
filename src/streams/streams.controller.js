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

        var p = TwitchService.getSingleGameStreams($stateParams.id, 10);

        p.then(function(streams) {
          // console.log('twitch call complete', streams);
          that.singleGameStreamsArray = streams;
        });



      }

})();
