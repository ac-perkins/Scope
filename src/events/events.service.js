(function() {
    'use strict';

    angular
      .module('app')
      .factory('EventsService', EventsService);

    EventsService.$inject = ['$q', '$firebaseObject', '$firebaseArray'];
    function EventsService($q, $firebaseObject, $firebaseArray) {

      var events = new Firebase('https://incandescent-heat-8431.firebaseio.com/events');
      // var eventObj =
      var allEvents = [];
      var singleGameEvents = [];

      return {
        createEvent: createEvent,
        getAllEvents: getAllEvents,
        getSingleGameEvents: getSingleGameEvents,
        getEventObject: getEventObject,
        editEventObject: editEventObject
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

      function getEventObject(eventId) {
        var eventObj = new Firebase('https://incandescent-heat-8431.firebaseio.com/events/' + eventId);
        return $firebaseObject(eventObj).$loaded()
          .then(function(obj) {
            console.log('$firebaseObject', obj);
            return obj;
          });
      }

      function editEventObject(eventId, editedEvent) {
        var eventObj = new Firebase('https://incandescent-heat-8431.firebaseio.com/events/' + eventId);
        console.log('editedEvent', editedEvent);
        // eventObj = editedEvent;
        eventObj.update(
          {
            date: editedEvent.date,
            game: editedEvent.game,
            location: editedEvent.location,
            name: editedEvent.name,
            stream: editedEvent.stream,
            twitter: editedEvent.twitter,
            website: editedEvent.website
          }
        );
      }

    }

})();
