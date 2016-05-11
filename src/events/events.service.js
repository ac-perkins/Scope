(function() {
    'use strict';

    angular
      .module('app')
      .factory('EventsService', EventsService);

    EventsService.$inject = ['$firebaseArray'];
    function EventsService($firebaseArray) {

      var events = new Firebase('https://incandescent-heat-8431.firebaseio.com/events');
      var singleGameEvents = [];
      var getEvents = $firebaseArray(events);

      return {
        getEvents: getEvents,
        getGameEvents: getGameEvents,
        createEvent: createEvent,
        singleGameEvents: singleGameEvents
      };

      function getGameEvents(game) {
        events.orderByChild("game").equalTo(game).on("child_added", function(snapshot) {

          console.log(snapshot.val());
          singleGameEvents.push(snapshot.val());
        });
      }

      function createEvent(newEvent) {
        $firebaseArray(events).$add(newEvent);
      }

    }

})();
