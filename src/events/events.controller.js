(function() {
    'use strict';

    angular
      .module('app')
      .controller('EventsController', EventsController);

      EventsController.$inject = ['$stateParams', 'EventsService'];
      function EventsController($stateParams, EventsService) {

        var that = this;
        this.singleGameEventsArray = null;

        EventsService.getSingleGameEvents($stateParams.id).then(function(events) {
          that.singleGameEventsArray = events;
        });

      }

})();
