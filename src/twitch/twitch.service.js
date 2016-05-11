(function() {
    'use strict';

    angular
      .module('app')
      .factory('TwitchService', TwitchService);

      TwitchService.$inject = ['$http'];
      function TwitchService($http) {

        return {
          getAllCategories: getAllCategories
        };

        function getAllCategories() {
          return $http({
            method: 'GET',
            url: 'https://api.twitch.tv/kraken/streams?game=Diablo+III',
          }).then(function success(response) {
            console.log(response);
            // return response.value.data;
          });
        }

      }

})();
