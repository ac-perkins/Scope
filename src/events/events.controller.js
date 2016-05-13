(function() {
    'use strict';

    angular
      .module('app')
      .controller('EventsController', EventsController);

      EventsController.$inject = ['$stateParams', 'EventsService'];
      function EventsController($stateParams, EventsService) {

        var that = this;
        this.singleGameEventsArray = [];

        // console.log(EventsService.getGameEvents($stateParams.id));

        EventsService.getGameEvents($stateParams.id).then(function(events) {
          that.singleGameEventsArray = events;
          console.log(that.singleGameEventsArray);
        });
      }

})();
