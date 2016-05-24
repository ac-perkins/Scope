(function() {
    'use strict';

    var assert = chai.assert;

    suite('events service', function() {
      var EventsService;
      var $httpBackend;

      setup(module('app'));

      setup(inject(function(_EventsService_, _$httpBackend_) {

        EventsService = _EventsService_;
        $httpBackend = _$httpBackend_;

        $httpBackend
          .whenPOST('https://incandescent-heat-8431.firebaseio.com/events')
          .respond(
            {name: 'Event 2', stream: 'www.twitch.com', game: 'Dota 2', date: 'March 20, 2016'}
          );

      }));

      test('sanity check', function() {
        assert.strictEqual( (2+2), 4, '2 + 2 equals 4' );
      });

      test('getEventObject works', function() {
        var p = EventsService.getEventObject('32448967wefjkh');

        assert.ok(p, 'function returns an object');
        assert.strictEqual(typeof p.then, 'function', 'function returns an object');
      });

      test('getSingleGameEvents works', function() {
        var p = EventsService.getSingleGameEvents('League of Legends');

        assert.ok(p, 'function returns an object');
        assert.strictEqual(typeof p.then, 'function', 'function returns an object');
      });

      test('getAllEvents works', function() {
        var p = EventsService.getAllEvents();

        assert.ok(p, 'function returns an object');
        assert.strictEqual(typeof p.then, 'function', 'function returns an object');
      });

      test('createEvent works', function() {
        var p = EventsService.createEvent();

        assert.ok(p, 'function returns an object');
        assert.strictEqual(typeof p.then, 'function', 'function returns an object');
      });

      test('editEventObject works', function() {
        var p = EventsService.editEventObject('32448967wefjkh',
          {
            date: '05/20/2016',
            game: 'SFV',
            iconSrc: 'SFV',
            location: 'San Francisco',
            name: 'EVO',
            stream: 'www.twitch.tv',
            twitter: 'www.twitter.com',
            website: 'www.123.com'
          }
        );

        assert.ok(p, 'function returns an object');
        assert.strictEqual(typeof p.then, 'function', 'function returns an object');
      });

      test('deleteEventObject works', function() {
        var p = EventsService.deleteEventObject('32448967wefjkh');

        assert.ok(p, 'function returns an object');
        assert.strictEqual(typeof p.then, 'function', 'function returns an object');
      });

    });

})();
