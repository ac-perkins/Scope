(function() {
    'use strict';

    angular
      .module('app')
      .controller('StreamsController', StreamsController);

      StreamsController.$inject = ['$sce', 'TwitchService'];
      function StreamsController($sce, TwitchService) {
        var that = this;
        this.singleGameStreamsArray = [];

        this.embeddedStream = $sce.trustAsResourceUrl("http://player.twitch.tv/?channel=guildwars2");
        console.log(this.embeddedStream);

        var p = TwitchService.getSingleGameStreams('Street Fighter V', 10);

        p.then(function(streams) {
          // console.log('twitch call complete', streams);
          that.singleGameStreamsArray = streams;
        });


      }

})();
