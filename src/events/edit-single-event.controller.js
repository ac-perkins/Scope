(function() {
    'use strict';

    angular
      .module('app')
      .controller('EditSingleEventController', EditSingleEventController);

      EditSingleEventController.$inject = ['$stateParams', 'EventsService', 'NavService'];
      function EditSingleEventController($stateParams, EventsService, NavService) {

        var that = this;
        this.event = null;
        this.gameList = NavService.navArray;

        EventsService.getEventObject($stateParams.id)
          .then(function(eventObj) {
            console.log(eventObj);
            that.event = eventObj;
            console.log('that.event in .then', that.event);
          });

        this.editEvent = function editEvent() {
          console.log('that.event', this.event);
          EventsService.editEventObject($stateParams.id, that.event);
        };

        this.deleteEvent = function deleteEvent() {
          EventsService.deleteEventObject($stateParams.id);
        };

      }

})();
