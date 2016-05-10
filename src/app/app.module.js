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
      templateUrl: 'home/home.template.html'
      // controller: 'HomeViewController',
      // controllerAs: 'home'
    })
    .state('createEvent', {
      url: '/create-event',
      templateUrl: 'events/create-event.template.html',
      controller: 'CreateEventController',
      controllerAs: 'create'
    });

  }

})();
