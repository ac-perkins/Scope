(function() {
    'use strict';

    angular
      .module('app')
      .factory('EventsService', EventsService);

    EventsService.$inject = ['$q', '$firebaseArray'];
    function EventsService($q, $firebaseArray) {

      var events = new Firebase('https://incandescent-heat-8431.firebaseio.com/events');
      var singleGameEvents = [];
      var getEvents = $firebaseArray(events);

      return {
        getEvents: getEvents,
        getGameEvents: getGameEvents,
        createEvent: createEvent,
      };

      function getGameEvents(game) {
        singleGameEvents = [];
        var def = $q.defer();
        events.orderByChild("game").equalTo(game).on("child_added", function(snapshot) {

          console.log(snapshot.val());
          singleGameEvents.push(snapshot.val());
          def.resolve(singleGameEvents);
        });
        return def.promise;
      }

      function createEvent(newEvent) {
        $firebaseArray(events).$add(newEvent);
      }

    }

})();
