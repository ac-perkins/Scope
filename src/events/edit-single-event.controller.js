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
        this.errorMessage = '';

        EventsService.getEventObject($stateParams.id)
          .then(function(eventObj) {
            console.log(eventObj);
            that.event = eventObj;
          })
          .catch(function(err) {
            console.log('catch error', err);
            that.errorMessage = 'The server is not responding. Please try again shortly.';
          });

        this.editEvent = function editEvent() {
          console.log('that.event', this.event);
          EventsService.editEventObject($stateParams.id, that.event)
            .then(function(ref) {
              console.log('in editEvent promise', ref);
            })
            .catch(function(err) {
              console.log('catch error', err);
              that.errorMessage = 'The server is not responding. Please try again shortly.';
            });
        };

        this.deleteEvent = function deleteEvent() {
          EventsService.deleteEventObject($stateParams.id)
            .then(function(ref) {
              console.log('in deleteEvent promise', ref);
            })
            .catch(function(err) {
              console.log('catch error', err);
              that.errorMessage = 'The server is not responding. Please try again shortly.';
            });
        };

      }

})();
