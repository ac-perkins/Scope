(function() {
    'use strict';

    angular
      .module('app')
      .controller('CreateEventController', CreateEventController);

    CreateEventController.$inject = ['$scope', '$state', 'EventsService', 'NavService'];
    function CreateEventController($scope, $state, EventsService, NavService) {

      this.singleGameEvents = EventsService.singleGameEvents;
      this.gameList = NavService.allGamesArray;
      var that = this;
      this.newEvent = null;
      this.errorMessage = '';

      $scope.$watch('create.newEvent.game', function makeIconSrc(v){
        v = v.replace(/[^\w]+/g, '');
        that.newEvent.iconSrc = v;
        console.log('$watch', that.newEvent.iconSrc);
      });

      this.addEvent = function addEvent() {
        return EventsService.createEvent(that.newEvent)
          .then(function handlePromise(ref) {
            console.log('in promise', ref);
            $state.go('editAllEvents');
          })
          .catch(function handleError(err) {
            console.log('catch error', err);
            that.errorMessage = 'The server is not responding. Please try again shortly.';
          });
      };


    }

})();
