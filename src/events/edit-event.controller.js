(function() {
    'use strict';

    angular
      .module('app')
      .controller('EditEventController', EditEventController);

      EditEventController.$inject = ['$stateParams', 'EventsService'];
      function EditEventController($stateParams, EventsService) {

        var that = this;
        this.allEvents = null;
        this.errorMessage = "";

        EventsService.getAllEvents()
          .then(function(events) {
            console.log(events);
            that.allEvents = events;
          })
          .catch(function(err) {
            console.log('catch error', err);
            that.errorMessage = "The server is not responding. Please try again shortly.";
          });
      }

})();
