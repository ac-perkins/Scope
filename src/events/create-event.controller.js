(function() {
    'use strict';

    angular
      .module('app')
      .controller('CreateEventController', CreateEventController);

    CreateEventController.$inject = ['EventsService'];
    function CreateEventController(EventsService) {
      console.log('in CreateEventController');


      this.singleGameEvents = EventsService.singleGameEvents;
      var that = this;
      this.newEvent = null;


      this.addEvent = function addEvent() {
        console.log('in createEvent function');
        console.log(that.newEvent);
        EventsService.createEvent(that.newEvent);
      };

      // var ref = new Firebase("https://incandescent-heat-8431.firebaseio.com/events");
      //
      // ref.orderByChild("game").equalTo('Street Fighter V').on("child_added", function(snapshot) {
      //   console.log(snapshot.val());
      // });

      // console.log(EventsService.getEvents);
      console.log(EventsService.getGameEvents('Street Fighter V'));
        // .then(console.log('in controller', EventsService.singleGameEvents));


      this.login = function login() {
        var ref = new Firebase("https://incandescent-heat-8431.firebaseio.com");
        ref.authWithOAuthPopup("google", function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
          } else {
            console.log("Authenticated successfully with payload:", authData);
          }
        });
      };

    }

})();
