(function () {
    'use strict';

    Config.$inject = ['$routeProvider', '$locationProvider'];

    angular.module('moviesApp', [
        'ngRoute', 'MoviesService'
    ]).config(Config);

    function Config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/views/list.html',
                controller: 'MoviesListController'
            })
            .when('/movies/add', {
                templateUrl: '/views/add.html',
                controller: 'MoviesAddController'
            })
            .when('/movies/edit/:id', {
                templateUrl: '/views/edit.html',
                controller: 'MoviesEditController'
            })
            .when('/movies/delete/:id', {
                templateUrl: '/views/delete.html',
                controller: 'MoviesDeleteController'
            });

        $locationProvider.html5Mode(true);
            
    }
})();