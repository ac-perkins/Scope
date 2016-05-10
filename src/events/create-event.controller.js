(function() {
    'use strict';

    angular
      .module('app')
      .controller('CreateEventController', CreateEventController);

    CreateEventController.$inject = ['EventsService'];
    function CreateEventController(EventsService) {
      console.log('in CreateEventController');
      var that = this;
      this.newEvent = null;

      this.addEvent = function addEvent() {
        console.log('in createEvent function');
        console.log(that.newEvent);
        EventsService.createEvent(that.newEvent);
      };


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
