(function() {
    'use strict';

    angular
      .module('app')
      .controller('NavController', NavController);

      NavController.$inject = ['NavService'];
      function NavController(NavService) {

        this.mobaArray = NavService.mobaArray;
        this.fightingArray = NavService.fightingArray;
        this.fpsArray = NavService.fpsArray;
        this.rtsArray = NavService.rtsArray;
        this.ccgArray = NavService.ccgArray;

      }

})();
