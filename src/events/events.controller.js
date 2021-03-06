(function() {
    'use strict';

    angular
      .module('app')
      .controller('EventsController', EventsController);

      EventsController.$inject = ['$stateParams', 'EventsService'];
      function EventsController($stateParams, EventsService) {

        var that = this;
        this.singleGameEventsArray = null;
        this.eventGame = $stateParams.id;
        this.errorMessage = "";

        EventsService.getSingleGameEvents($stateParams.id)
          .then(function(events) {
            console.log('events', events);
            that.singleGameEventsArray = events;
          })
          .catch(function (err) {
            console.log('catch error', err);
            that.errorMessage = "The server is not responding. Please try again shortly.";
          });

          $('ul').on('click', '.slide', function() {
            $(this).find('.slide-toggle').slideToggle(300);
          });

      }

})();
