(function() {
    'use strict';

    angular
      .module('app')
      .controller('EditEventController', EditEventController);

      EditEventController.$inject = ['$stateParams', 'EventsService'];
      function EditEventController($stateParams, EventsService) {
        console.log('in EditEventController');
        // console.log($stateParams.id);
        var that = this;

        this.allEvents = null;
        EventsService.getAllEvents().then(function(events) {
          console.log(events);
          that.allEvents = events;
        });
        // console.log(this.allEvents);

        // console.log(EventsService.getEventObject($stateParams.id));
      }

})();
