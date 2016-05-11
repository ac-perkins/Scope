(function() {
    'use strict';

    angular
      .module('app')
      .factory('TwitchService', TwitchService);

      TwitchService.$inject = ['$q'];
      function TwitchService($q) {

        var singleGameStreamsArray = null;

        return {
          getSingleGameStreams: getSingleGameStreams,
          getSingleGameStreamsArray: getSingleGameStreamsArray
        };

        function getSingleGameStreams(gameName, maxStreams) {
          var def = $q.defer();
          Twitch.api({method: 'streams', params: {game: gameName, limit: maxStreams} }, function(error, list) {
            console.log('In getSingleGameStreams success', list.streams);
            singleGameStreamsArray = list.streams;
            def.resolve(list.streams);
            // console.log('var', singleGameStreamsArray);
          });
          return def.promise;
        }

        function getSingleGameStreamsArray() {
          return singleGameStreamsArray;
        }

      }

})();
