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
          Twitch.api({method: 'streams', params: {game: gameName, limit: maxStreams, client_id: 'nda9qwhtllum6kp584qw6m2a3xf81kc'} }, function(error, list) {
            console.log('In getSingleGameStreams success', list.streams);
            if (error) {
              console.log('Error', error);
              def.reject(error);
            } else {
              singleGameStreamsArray = list.streams;
              def.resolve(list.streams);
            }
          });
          return def.promise;
        }

        function getSingleGameStreamsArray() {
          return singleGameStreamsArray;
        }

      }

})();
