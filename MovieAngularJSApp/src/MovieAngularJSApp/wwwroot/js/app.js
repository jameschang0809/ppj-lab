/// <autosync enabled="true" />
/// <reference path="../gulpfile.js" />
/// <reference path="app.js" />
/// <reference path="Controllers/moviesController.js" />
/// <reference path="Services/moviesService.js" />
/// <reference path="../wwwroot/js/app.js" />
/// <reference path="../wwwroot/js/site.min.js" />
/// <reference path="../wwwroot/lib/angular/angular.js" />
/// <reference path="../wwwroot/lib/angular-resource/angular-resource.js" />
/// <reference path="../wwwroot/lib/angular-route/angular-route.js" />
/// <reference path="../wwwroot/lib/bootstrap/dist/js/bootstrap.js" />
/// <reference path="../wwwroot/lib/jquery/dist/jquery.js" />

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
(function () {
    'use strict';

    angular
        .module('moviesApp')
        .controller('MoviesListController', MoviesListController)
        .controller('MoviesAddController', MoviesAddController)
        .controller('MoviesEditController', MoviesEditController)
        .controller('MoviesDeleteController', MoviesDeleteController);

    MoviesListController.$inject = ['$scope', 'Movie'];

    function MoviesListController($scope, Movie) {
        $scope.movies = Movie.query();
    }

    MoviesAddController.$inject = ['$scope', '$location', 'Movie'];

    function MoviesAddController($scope, $location, Movie) {
        $scope.movie = new Movie();
        $scope.add = function () {
            $scope.movie.$save(function () {
                $location.path('/');
            });
        };
    }

    MoviesEditController.$inject = ['$scope', '$routeParams', '$location', 'Movie'];

    function MoviesEditController($scope, $routeParams, $location, Movie) {
        $scope.movie = Movie.get({ id: $routeParams.id });
        $scope.edit = function () {
            $scope.movie.$save(function () {
                $location.path('/');
            })
        }
    }

    MoviesDeleteController.$inject = ['$scope', '$routeParams', '$location', 'Movie'];

    function MoviesDeleteController($scope, $routeParams, $location, Movie) {
        $scope.movie = Movie.get({ id: $routeParams.id });
        $scope.remove = function () {
            $scope.movie.$remove({ id: $scope.movie.Id }, function () {
                $location.path('/');
            })
        }
    }
})();
(function () {
    'use strict';

    angular
        .module('MoviesService', ['ngResource'])
        .factory('Movie', Movie);

    Movie.$inject = ['$resource'];

    function Movie($resource) {
        return $resource('/api/movies/:id');
    }
})();