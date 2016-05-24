(function() {
    'use strict';

    var assert = chai.assert;

    suite('edit event controller', function() {
      var edit;
      var $rootScope;
      var mockEventsService = {};


      setup(module('app'));

      setup(module(function($provide) {
        $provide.value('EventsService', mockEventsService);
      }));

      setup(inject(function($stateParams, $controller, $q, _$rootScope_) {
        $rootScope = _$rootScope_;


        mockEventsService.getAllEvents = function() {
          var def = $q.defer();
          def.resolve([
            {
              name: 'test event',
              location: 'Boston',
              website: 'www.test.com',
              game: 'Dota 2'
            },
            {
              name: 'test event 2',
              location: 'Atlanta',
              website: 'www.cnn.com',
              game: 'SFV'
            }
          ]);
          return def.promise;
        };

        edit = $controller('EditEventController');

      }));

      test('sanity check', function() {
        assert.strictEqual( (2+2), 4, '2 + 2 equals 4' );
      });

      test('errorMessage is an emptry string to start', function() {
        assert.strictEqual(edit.errorMessage, '', 'errorMessage is empty');

        $rootScope.$digest();

        assert.isArray(edit.allEvents, 'all events is an array');
        assert.strictEqual(edit.allEvents.length, 2, 'proper number of events exist');
      });


    });

})();
