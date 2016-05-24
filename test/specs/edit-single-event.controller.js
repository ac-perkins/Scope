(function() {
    'use strict';

    var assert = chai.assert;

    suite('edit single event controller', function() {
      var es;
      var $rootScope;
      var $httpBackend;
      var mockEventsService = {};
      var mockNavService = {};

      setup(module('app'));

      setup(module(function($provide) {
        $provide.value('EventsService', mockEventsService);
        $provide.value('NavService', mockNavService);
      }));

      setup(inject(function($controller, $q, _$rootScope_, _$httpBackend_) {
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        var scope = $rootScope.$new();


        $httpBackend
          .whenGET('home/home.template.html')
          .respond('<p>hi!</p>');

        mockEventsService.getEventObject = function() {
          var def = $q.defer();

            def.resolve(
              {
                id: '-KIOrW6ycTXcC5xUzTto',
                name: 'test event',
                location: 'Boston',
                website: 'www.test.com',
                game: 'Dota 2'
              }
            );

          return def.promise;
        };

        mockEventsService.editEventObject = function(id, event) {
          var def = $q.defer();
          if(event.location === 'Miami'){
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

        mockEventsService.deleteEventObject = function(event) {
          var def = $q.defer();
          if(event === '12345'){
            def.reject({
              status: 401
            });
          } else {
            def.resolve(
              {
                id: '-KIOrW6ycTXcC5xUzTto',
              }
            );
          }
          return def.promise;
        };

        es = $controller('EditSingleEventController', { $scope: scope });

      }));

      test('sanity check', function() {
        assert.strictEqual( (2+2), 4, '2 + 2 equals 4' );
      });

      test('errorMessage is an emptry string to start', function() {
        assert.strictEqual(es.errorMessage, '', 'errorMessage is empty');
      });

      test('editing an event works', function(doneCallback) {
        assert.isNotOk(es.event, null, 'event key values begin as null');

        es.event = {name: 'test event', location:'Austin', game:'SFV'};
        es.editEvent()
          .then(function() {
            assert.strictEqual(es.event.name, 'test event', 'event name is expected name');
            console.log('es.event', es.event);
            doneCallback();
          })
          .catch(function() {
            assert.ok(false, 'should not fire');
            doneCallback();
          });

        $rootScope.$digest();
      });

      test('errorMessage for event editing works', function(doneCallback) {

        es.event = {name: 'test event', location:'Miami', game:'Dota 2'};
        es.editEvent()
          .then(function() {
            assert.isAtLeast(es.errorMessage.length, 5, 'error message because not authorized');
            doneCallback();
          })
          .catch(function() {
            assert.ok(false, 'should not fire');
            doneCallback();
          });

        $rootScope.$digest();
      });


      test('deleting an event works', function(doneCallback) {
        assert.isNotOk(es.event, null, 'event key values begin as null');

        es.deleteEvent()
          .then(function() {
            assert.strictEqual(es.event.name, 'test event', 'event name is expected name');
            console.log('es.event', es.event);
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
