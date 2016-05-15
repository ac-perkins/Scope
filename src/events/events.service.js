(function() {
    'use strict';

    angular
      .module('app')
      .factory('EventsService', EventsService);

    EventsService.$inject = ['$q', '$firebaseArray'];
    function EventsService($q, $firebaseArray) {

      var events = new Firebase('https://incandescent-heat-8431.firebaseio.com/events');
      var allEvents = [];
      var singleGameEvents = [];

      return {
        createEvent: createEvent,
        getAllEvents: getAllEvents,
        getSingleGameEvents: getSingleGameEvents
      };

      function createEvent(newEvent) {      // TODO: ERROR HANDLING
        $firebaseArray(events).$add(newEvent);
          // .then(function(ref) {
          //   console.log('in createEvent promise', ref);
          // });
      }

      function getAllEvents() {
        return $firebaseArray(events).$loaded()
          .then(function(x) {
            allEvents = x;
            return allEvents;
          })
          .catch(function(error) {
            console.log("Error:", error);
            return error;
          });
      }

      function getSingleGameEvents(game) {
        singleGameEvents = [];
        return $firebaseArray(events).$loaded()
          .then(function(x) {
            x.forEach(function findEvent(each) {
              if(each.game === game) {
                singleGameEvents.push(each);
              }
            });
            return singleGameEvents;
          })
          .catch(function(error) {
            console.log("Error:", error);
            return error;
          });
      }

    }

})();
