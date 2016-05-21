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
