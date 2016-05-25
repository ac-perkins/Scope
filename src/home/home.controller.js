(function() {
    'use strict';

    angular
      .module('app')
      .controller('HomeController', HomeController);

      HomeController.$inject = ['EventsService'];
      function HomeController(EventsService) {

        var that = this;
        this.upcomingEvents = null;
        this.errorMessage = '';

        EventsService.getAllEvents()
          .then(function(events) {
            that.upcomingEvents = events;
          })
          .catch(function (err) {
            console.log('catch error', err);
            that.errorMessage = "The server is not responding. Please try again shortly.";
          });

        // this.clicked = function clicked($event) {
        //   var a = $($event.target);
        //   var p = $(this).closest( ".slide").find("li:last-child");
        //   console.log(a.next());
        //   p.slideToggle();
        // };

        $('ul').on('click', '.slide', function() {
          $(this).find('.slide-toggle').slideToggle();

        });

      }

})();
