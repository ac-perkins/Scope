(function() {
    'use strict';

    var assert = chai.assert;

    suite('create event controller', function() {
      var create;
      var $rootScope;
      var mockEventsService = {};
      var mockNavService = {};

      setup(module('app'));

      setup(module(function($provide) {
        $provide.value('EventsService', mockEventsService);
        $provide.value('NavService', mockNavService);
      }));

      setup(inject(function($controller, $q, _$rootScope_) {
        $rootScope = _$rootScope_;
        var scope = $rootScope.$new();
        create = $controller('CreateEventController', { $scope: scope });

        mockEventsService.createEvent = function(newEvent) {
          var def = $q.defer();
          if(newEvent.location === 'Miami'){
            def.reject({
              status: 401
            });
          } else {
            def.resolve(
              {
                id: '-KIOrW6ycTXcC5xUzTto',
                name: 'test event',
                location: 'Boston',
                website: 'www.test.com',
                game: 'Dota 2'
              }
            );
          }
          return def.promise;
        };


      }));

      test('sanity check', function() {
        assert.strictEqual( (2+2), 4, '2 + 2 equals 4' );
      });

      test('errorMessage is an emptry string to start', function() {
        assert.strictEqual(create.errorMessage, '', 'errorMessage is empty');
      });

      test('creating a new event works', function(doneCallback) {
        assert.isNotOk(create.newEvent, null, 'newEvent key values begin as null');

        create.newEvent = {name: 'test event', location:'Austin', game:'SFV'};
        create.addEvent()
          .then(function() {
            assert.strictEqual(create.newEvent.name, 'test event', 'event name is expected name');
            console.log('newAuthor', create.newEvent);
            doneCallback();
          })
          .catch(function() {
            assert.ok(false, 'should not fire');
            doneCallback();
          });

        $rootScope.$digest();
      });

      test('errorMessage works', function(doneCallback) {

        create.newEvent = {name: 'test event', location:'Miami', game:'Dota 2'};
        create.addEvent()
          .then(function() {
            assert.isAtLeast(create.errorMessage.length, 5, 'error message because not authorized');
            doneCallback();
          })
          .catch(function() {
            assert.ok(false, 'should not fire');
            doneCallback();
          });

        $rootScope.$digest();
      });

    });



})();
