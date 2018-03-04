(function() {
    'use strict';

  angular
    .module('app',['firebase', 'ui.router'])
    .config(appConfig);

  appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function appConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'home/home.template.html',
      controller: 'HomeController',
      controllerAs: 'home'
    })
    .state('events', {
      url: '/events/:id',
      templateUrl: 'events/events.template.html',
      controller: 'EventsController',
      controllerAs: 'events'
    })
    .state('createEvent', {
      url: '/event/create',
      templateUrl: 'events/create-event.template.html',
      controller: 'CreateEventController',
      controllerAs: 'create'
    })
    .state('editAllEvents', {
      url: '/event/edit',
      templateUrl: 'events/edit-all-events.template.html',
      controller: 'EditEventController',
      controllerAs: 'edit'
    })
    .state('editEvent', {
      url: '/event/edit/:id',
      templateUrl: 'events/edit-event.template.html',
      controller: 'EditSingleEventController',
      controllerAs: 'es'
    })
    .state('streams', {
      url: '/streams/:id',
      templateUrl: 'streams/streams.template.html',
      controller: 'StreamsController',
      controllerAs: 'streams'
    });

  }

})();
;(function() {
    'use strict';

    angular
      .module('app')
      .controller('AppController', AppController);

      AppController.$inject = ['$state', '$stateParams', '$sce', '$window', 'LoginService'];
      function AppController($state, $stateParams, $sce, $window, LoginService) {
        var that = this;
        this.authData = null;
        this.embeddedStream = '';
        this.errorMessage = '';
        this.streamHeight = 405;
        this.streamWidth = 720;
        this.largeStream = false;


        this.changeStream = function changeStream(streamName) {
          console.log('in changeStream function');
          console.log(streamName);
          that.embeddedStream = $sce.trustAsResourceUrl('https://player.twitch.tv/?channel=' + streamName);
        };

        this.login = function login() {
          LoginService.login()
            .then(function getAuthData(data) {
              console.log('in login promise', data);
              that.authData = data;
              $state.transitionTo($state.current, $stateParams, {
                    reload: true,
                    inherit: false,
                    notify: true
                  });
            })
            .catch(function (err) {
              console.log('catch error', err);
              that.errorMessage = 'The server is not responding. Please try again shortly.';
            });
        };


        this.logout = function logout() {
          LoginService.logout();
          that.authData = null;
        };

        this.theaterMode = function theaterMode() {
          this.largeStream = true;
          this.streamWidth = window.innerWidth * 0.8;
          this.streamHeight = (this.streamWidth / 16) * 9;
          $('body').css({'background-color': '#333'});
          $('iframe').css({'display': 'block', 'margin': '0 auto'});
          $('.stream').css({'float': 'none', 'margin-top': '1%'});
        };

        this.defaultMode = function defaultMode() {
          this.streamHeight = 405;
          this.streamWidth = 720;
          this.largeStream = false;
          $('body').css('background-color', '#EFEEF7');
          $('.stream').css({'float': 'right', 'margin-top': '3%'});
        };

      }

})();
;(function() {
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
;(function() {
    'use strict';

    angular
      .module('app')
      .controller('EditEventController', EditEventController);

      EditEventController.$inject = ['$stateParams', 'EventsService'];
      function EditEventController($stateParams, EventsService) {

        var that = this;
        this.allEvents = null;
        this.errorMessage = "";

        EventsService.getAllEvents()
          .then(function(events) {
            console.log(events);
            that.allEvents = events;
          })
          .catch(function(err) {
            console.log('catch error', err);
            that.errorMessage = "The server is not responding. Please try again shortly.";
          });
      }

})();
;(function() {
    'use strict';

    angular
      .module('app')
      .controller('EditSingleEventController', EditSingleEventController);

      EditSingleEventController.$inject = ['$scope', '$state', '$stateParams', 'EventsService', 'NavService'];
      function EditSingleEventController($scope, $state, $stateParams, EventsService, NavService) {

        var that = this;
        this.event = null;
        this.gameList = NavService.allGamesArray;
        this.errorMessage = '';

        $scope.$watch('es.event.game', function editIconSrc(v){
          v = v.replace(/[^\w]+/g, '');
          that.event.iconSrc = v;
          console.log('$watch', that.event.iconSrc);
        });

        EventsService.getEventObject($stateParams.id)
          .then(function(eventObj) {
            console.log(eventObj);
            that.event = eventObj;
          })
          .catch(function(err) {
            console.log('catch error', err);
            that.errorMessage = 'The server is not responding. Please try again shortly.';
          });

        this.editEvent = function editEvent() {
          console.log('that.event', this.event);
          return EventsService.editEventObject($stateParams.id, that.event)
            .then(function(ref) {
              console.log('in editEvent promise', ref);
              $state.go('editAllEvents');
            })
            .catch(function(err) {
              console.log('catch error', err);
              that.errorMessage = 'The server is not responding. Please try again shortly.';
            });
        };

        this.deleteEvent = function deleteEvent() {
          return EventsService.deleteEventObject($stateParams.id)
            .then(function(ref) {
              console.log('in deleteEvent promise', ref);
            })
            .catch(function(err) {
              console.log('catch error', err);
              that.errorMessage = 'The server is not responding. Please try again shortly.';
            });
        };

        this.cancelEdit = function cancelEdit() {
          $state.go('editAllEvents');
        };

      }

})();
;(function() {
    'use strict';

    angular
      .module('app')
      .controller('EventsController', EventsController);

      EventsController.$inject = ['$stateParams', 'EventsService'];
      function EventsController($stateParams, EventsService) {

        var that = this;
        this.singleGameEventsArray = null;
        this.eventGame = $stateParams.id;
        this.errorMessage = "";

        EventsService.getSingleGameEvents($stateParams.id)
          .then(function(events) {
            console.log('events', events);
            that.singleGameEventsArray = events;
          })
          .catch(function (err) {
            console.log('catch error', err);
            that.errorMessage = "The server is not responding. Please try again shortly.";
          });

          $('ul').on('click', '.slide', function() {
            $(this).find('.slide-toggle').slideToggle(300);
          });

      }

})();
;(function() {
    'use strict';

    angular
      .module('app')
      .factory('EventsService', EventsService);

    EventsService.$inject = ['$q', '$firebaseObject', '$firebaseArray'];
    function EventsService($q, $firebaseObject, $firebaseArray) {

      var events = new Firebase('https://incandescent-heat-8431.firebaseio.com/events');
      var allEvents = [];
      var singleGameEvents = [];

      return {
        createEvent: createEvent,
        getAllEvents: getAllEvents,
        getSingleGameEvents: getSingleGameEvents,
        getEventObject: getEventObject,
        editEventObject: editEventObject,
        deleteEventObject: deleteEventObject
      };

      function createEvent(newEvent) {
        return $firebaseArray(events).$add(newEvent)
          .then(function(ref) {
            console.log('ref', ref);
            var id = ref.key();
            console.log("added record with id " + id);
            return id;
          });
      }

      function getAllEvents() {
        return $firebaseArray(events).$loaded()
          .then(function(x) {
            allEvents = x;
            return allEvents;
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
        return eventObj.update(
          {
            date: editedEvent.date,
            game: editedEvent.game,
            iconSrc: editedEvent.iconSrc,
            location: editedEvent.location,
            name: editedEvent.name,
            stream: editedEvent.stream,
            twitter: editedEvent.twitter,
            website: editedEvent.website
          })
          .then(function() {
            return 'success!';
        });
      }

      function deleteEventObject(eventId) {
        var eventObj = new Firebase('https://incandescent-heat-8431.firebaseio.com/events/' + eventId);
        return $firebaseObject(eventObj).$remove()
          .then(function(ref) {
            console.log(ref);
            return ref;
          });
      }

    }

})();
;(function() {
    'use strict';

    angular
      .module('app')
      .controller('HomeController', HomeController);

      HomeController.$inject = ['EventsService'];
      function HomeController(EventsService) {

        var that = this;
        this.upcomingEvents = null;
        this.errorMessage = '';

        EventsService.getAllEvents()
          .then(function(events) {
            that.upcomingEvents = events;
          })
          .catch(function (err) {
            console.log('catch error', err);
            that.errorMessage = "The server is not responding. Please try again shortly.";
          });

        $('ul').on('click', '.slide', function() {
          $(this).find('.slide-toggle').slideToggle(300);
        });

      }

})();
;(function() {
    'use strict';

    angular
      .module('app')
      .factory('LoginService', LoginService);

      LoginService.$inject = ['$firebaseAuth'];
      function LoginService($firebaseAuth) {

        var ref = new Firebase("https://incandescent-heat-8431.firebaseio.com");
        var userData = null;

        return {
          login: login,
          userData: userData,
          logout: logout
        };

        function login() {
          return ref.authWithOAuthPopup("google")
            .then(function(authData) {
              console.log(authData);
              userData = authData;
              return userData;
            });
        }

        function logout() {
          var authObj = $firebaseAuth(ref);
          authObj.$unauth();
          userData = null;             
        }

      }

})();
;(function() {
    'use strict';

    angular
      .module('app')
      .controller('NavController', NavController);

      NavController.$inject = ['NavService'];
      function NavController(NavService) {

        this.mobaArray = NavService.mobaArray;
        this.fightingArray = NavService.fightingArray;
        this.fpsArray = NavService.fpsArray;
        this.rtsArray = NavService.rtsArray;
        this.ccgArray = NavService.ccgArray;

      }

})();
;(function() {
    'use strict';

    angular
      .module('app')
      .factory('NavService', NavService);

      function NavService() {

        var allGamesArray = [
          {name: 'Dota 2'},
          {name: 'League of Legends'},
          {name: 'Heroes of the Storm'},
          {name: 'Street Fighter V'},
          {name: 'Tekken 7'},
          {name: 'Killer Instinct'},
          {name: 'Super Smash Bros. for Wii U'},
          {name: 'Counter-Strike: Global Offensive'},
          {name: 'Overwatch'},
          {name: 'Call of Duty: Black Ops III'},
          {name: 'StarCraft II'},
          {name: 'Hearthstone'},
          {name: 'Duelyst'},
        ];

        var mobaArray = [
          {id: 'Dota 2', name: 'Dota 2'},
          {id: 'Heroes of the Storm', name: 'Heroes of the Storm'},
          {id: 'League of Legends', name: 'League of Legends'}
        ];

        var fightingArray = [
          {id: 'Killer Instinct', name: 'Killer Instinct'},
          {id: 'Street Fighter V', name: 'Street Fighter V'},
          {id: 'Tekken 7', name: 'Tekken 7'},
          {id: 'Super Smash Bros. for Wii U', name: 'Super Smash Bros.'}
        ];

        var fpsArray = [
          {id: 'Call of Duty: Black Ops III', name: 'Call of Duty: Black Ops III'},
          {id: 'Counter-Strike: Global Offensive', name: 'Counter-Strike: GO'},
          {id: 'Overwatch', name: 'Overwatch'}
        ];

        var rtsArray = [
          {id: 'StarCraft II', name: 'StarCraft II'}
        ];

        var ccgArray = [
          {id: 'Hearthstone', name: 'Hearthstone'},
          {id: 'Gwent: The Witcher Card Game', name: 'Gwent'},
          {id: 'Duelyst', name: 'Duelyst'}
        ];

        return {
          allGamesArray: allGamesArray,
          mobaArray: mobaArray,
          fightingArray: fightingArray,
          fpsArray: fpsArray,
          rtsArray: rtsArray,
          ccgArray: ccgArray
        };
      }

})();
;(function() {
    'use strict';

    angular
      .module('app')
      .controller('StreamsController', StreamsController);

      StreamsController.$inject = ['$state', '$stateParams', 'TwitchService'];
      function StreamsController($state, $stateParams, TwitchService) {
        console.log('$stateParams', $stateParams);
        var that = this;
        this.singleGameStreamsArray = null;
        this.noUserIcon = {img: 'images/GlitchIcon.png'};
        this.errorMessage = "";

        TwitchService.getSingleGameStreams($stateParams.id, 10)
          .then(function(streams) {
            console.log(streams);
            if (streams.length === 0) {
              $state.go('home');
            } else {
              that.singleGameStreamsArray = streams;
            }
          })
          .catch(function(err) {
            console.log('catch error', err);
            that.errorMessage = "Twitch is not responding to requests. Please try again shortly.";
          });



      }

})();
;(function() {
    'use strict';

    angular
      .module('app')
      .factory('TwitchService', TwitchService);

      TwitchService.$inject = ['$q'];
      function TwitchService($q) {

        var singleGameStreamsArray = null;

        return {
          getSingleGameStreams: getSingleGameStreams,
          getSingleGameStreamsArray: getSingleGameStreamsArray
        };

        function getSingleGameStreams(gameName, maxStreams) {
          var def = $q.defer();
          Twitch.api({method: 'streams', params: {game: gameName, limit: maxStreams, client_id: 'nda9qwhtllum6kp584qw6m2a3xf81kc'} }, function(error, list) {
            console.log('In getSingleGameStreams success', list.streams);
            if (error) {
              console.log('Error', error);
              def.reject(error);
            } else {
              singleGameStreamsArray = list.streams;
              def.resolve(list.streams);
            }
          });
          return def.promise;
        }

        function getSingleGameStreamsArray() {
          return singleGameStreamsArray;
        }

      }

})();

//# sourceMappingURL=app.js.map