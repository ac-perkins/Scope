(function() {
    'use strict';

    angular
      .module('app')
      .factory('NavService', NavService);

      function NavService() {

        var allGamesArray = [
          {name: 'Dota 2'},
          {name: 'League of Legends'},
          {name: 'Heroes of the Storm'},
          {name: 'Street Fighter V'},
          {name: 'Killer Instinct'},
          {name: 'Super Smash Bros. for Wii U'},
          {name: 'Counter-Strike: Global Offensive'},
          {name: 'Overwatch'},
          {name: 'Call of Duty: Black Ops III'},
          {name: 'StarCraft II'},
          {name: 'Hearthstone'},
          {name: 'Duelyst'},
        ];

        var mobaArray = [
          {id: 'Dota 2', name: 'Dota 2'},
          {id: 'Heroes of the Storm', name: 'Heroes of the Storm'},
          {id: 'League of Legends', name: 'League of Legends'}
        ];

        var fightingArray = [
          {id: 'Killer Instinct', name: 'Killer Instinct'},
          {id: 'Street Fighter V', name: 'Street Fighter V'},
          {id: 'Super Smash Bros. for Wii U', name: 'Super Smash Bros.'}
        ];

        var fpsArray = [
          {id: 'Call of Duty: Black Ops III', name: 'Call of Duty: Black Ops III'},
          {id: 'Counter-Strike: Global Offensive', name: 'Counter-Strike: GO'},
          {id: 'Overwatch', name: 'Overwatch'}
        ];

        var rtsArray = [
          {id: 'StarCraft II', name: 'StarCraft II'}
        ];

        var ccgArray = [
          {id: 'Hearthstone', name: 'Hearthstone'},
          {id: 'Duelyst', name: 'Duelyst'}
        ];

        return {
          allGamesArray: allGamesArray,
          mobaArray: mobaArray,
          fightingArray: fightingArray,
          fpsArray: fpsArray,
          rtsArray: rtsArray,
          ccgArray: ccgArray
        };
      }

})();
