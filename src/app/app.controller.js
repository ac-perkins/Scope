(function() {
    'use strict';

    angular
      .module('app')
      .controller('AppController', AppController);

      AppController.$inject = ['$sce'];
      function AppController($sce) {
        var that = this;
        this.embeddedStream = $sce.trustAsResourceUrl("http://player.twitch.tv/?channel=Arlieth");

        this.changeStream = function changeStream(streamName) {
          console.log('in changeStream function');
          console.log(streamName);
          that.embeddedStream = $sce.trustAsResourceUrl("http://player.twitch.tv/?channel=" + streamName);
        };

      }

})();
