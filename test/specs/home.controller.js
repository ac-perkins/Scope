(function() {
    'use strict';

    var assert = chai.assert;

    suite('home controller', function() {
      var home;
      var $rootScope;
      var mockEventsService = {};


      setup(module('app'));

      setup(module(function($provide) {
        $provide.value('EventsService', mockEventsService);
      }));

      setup(inject(function($controller, $q, _$rootScope_) {
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

        home = $controller('HomeController');

      }));

      test('sanity check', function() {
        assert.strictEqual( (2+2), 4, '2 + 2 equals 4' );
      });

      test('errorMessage is an emptry string to start', function() {
        assert.strictEqual(home.errorMessage, '', 'errorMessage is empty');

        $rootScope.$digest();

        assert.isArray(home.upcomingEvents, 'upcoming events is an array');
        assert.strictEqual(home.upcomingEvents.length, 2, 'proper number of events exist');
      });

    });



})();
