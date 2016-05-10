(function() {
    'use strict';

    angular
      .module('app')
      .factory('EventsService', EventsService);

    EventsService.$inject = ['$firebaseArray'];
    function EventsService($firebaseArray) {

      var events = new Firebase('https://incandescent-heat-8431.firebaseio.com/events');

      return {
        getEvents: getEvents,
        createEvent: createEvent
      };

      function getEvents() {
        return $firebaseArray(events);
      }

      function createEvent(newEvent) {
        return $firebaseArray(events).$add(newEvent);
      }

    }

})();
