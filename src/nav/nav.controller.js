(function() {
    'use strict';

    angular
      .module('app')
      .controller('NavController', NavController);

      NavController.$inject = ['NavService'];
      function NavController(NavService) {
        console.log('in nav controller');
        this.navArray = NavService.navArray;

      }

})();
