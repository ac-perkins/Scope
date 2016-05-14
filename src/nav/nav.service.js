(function() {
    'use strict';

    angular
      .module('app')
      .factory('NavService', NavService);

      function NavService() {

        var navArray = [
          {id: 'Dota 2', name: 'Dota 2'},
          {id: 'League of Legends', name: 'League of Legends'},
          {id: 'Street Fighter V', name: 'Street Fighter V'},
          {id: 'Counter-Strike: Global Offensive', name: 'Counter-Strike: GO'},
          {id: 'Hearthstone: Heroes of Warcraft', name: 'Hearthstone'}
        ];

        return {
          navArray: navArray
        };
      }

})();
