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

      test('get event object works', function() {
        var p = EventsService.getEventObject('32448967wefjkh');

        assert.ok(p, 'function returns an object');
        assert.strictEqual(typeof p.then, 'function', 'function returns an object');
      });









    });

})();
