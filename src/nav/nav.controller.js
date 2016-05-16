(function() {
    'use strict';

    angular
      .module('app')
      .controller('NavController', NavController);

      NavController.$inject = ['NavService'];
      function NavController(NavService) {

        this.navArray = NavService.navArray;

      }

})();
