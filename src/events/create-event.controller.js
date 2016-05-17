(function() {
    'use strict';

    angular
      .module('app')
      .controller('CreateEventController', CreateEventController);

    CreateEventController.$inject = ['EventsService', 'NavService'];
    function CreateEventController(EventsService, NavService) {

      this.singleGameEvents = EventsService.singleGameEvents;
      this.gameList = NavService.navArray;
      var that = this;
      this.newEvent = null;
      this.errorMessage = '';

      this.addEvent = function addEvent() {
        EventsService.createEvent(that.newEvent)
          .then(function(ref) {
            console.log('in promise', ref);
          })
          .catch(function(err) {
            console.log('catch error', err);
            that.errorMessage = 'The server is not responding. Please try again shortly.';
          });
      };


    }

})();
