(function() {
    'use strict';

    angular
      .module('app')
      .controller('EventsController', EventsController);

      EventsController.$inject = ['$stateParams', 'EventsService'];
      function EventsController($stateParams, EventsService) {

        var that = this;
        this.singleGameEventsArray = null;
        this.errorMessage = "";

        EventsService.getSingleGameEvents($stateParams.id)
          .then(function(events) {
            that.singleGameEventsArray = events;
          })
          .catch(function (err) {
            console.log('catch error', err);
            that.errorMessage = "The Firebase server is not responding. Please try again shortly.";
          });

      }

})();
