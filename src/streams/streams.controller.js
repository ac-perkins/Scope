(function() {
    'use strict';

    angular
      .module('app')
      .controller('StreamsController', StreamsController);

      StreamsController.$inject = ['$sce','$stateParams', 'TwitchService'];
      function StreamsController($sce, $stateParams, TwitchService) {
        console.log('$stateParams', $stateParams);
        var that = this;
        this.singleGameStreamsArray = [];

        this.embeddedStream = $sce.trustAsResourceUrl("http://player.twitch.tv/?channel=Arlieth");
        console.log(this.embeddedStream);

        var p = TwitchService.getSingleGameStreams($stateParams.id, 10);

        p.then(function(streams) {
          // console.log('twitch call complete', streams);
          that.singleGameStreamsArray = streams;
        });

        this.changeStream = function changeStream(streamName) {
          console.log('in changeStream function');
          console.log(streamName);
          that.embeddedStream = $sce.trustAsResourceUrl("http://player.twitch.tv/?channel=" + streamName);
        };


      }

})();
