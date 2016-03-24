(function () {
    'use strict';

    Config.$inject = ['$routeProvider', '$locationProvider'];

    angular.module('moviesApp', [
        'ngRoute', 'ngAnimate', 'ui.bootstrap', 'MoviesService'
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
        .controller('MoviesDeleteController', MoviesDeleteController)
        .controller('DatePickerController', DatePickerController);

    MoviesListController.$inject = ['$scope', 'Movie'];

    function MoviesListController($scope, Movie) {
        $scope.movies = Movie.query();
    }

    MoviesAddController.$inject = ['$scope', '$location', 'Movie'];

    function MoviesAddController($scope, $location, Movie) {
        $scope.movie = new Movie();
        $scope.add = function () {
            $scope.movie.$save(
                function () {
                    $location.path('/');
                },
                function (error) {
                    _showValidationErrors($scope, error);
                }
            );
        };
    }

    MoviesEditController.$inject = ['$scope', '$routeParams', '$location', 'Movie'];

    function MoviesEditController($scope, $routeParams, $location, Movie) {
        $scope.movie = Movie.get({ id: $routeParams.id });
        $scope.edit = function () {
            $scope.movie.$save(
                function () {
                    $location.path('/');
                },
                function (error) {
                    _showValidationErrors($scope, error);
                }
            );
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

    DatePickerController.$inject = ['$scope'];

    function DatePickerController($scope) {
        $scope.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };
    }

    function _showValidationErrors($scope, error) {
        $scope.validationErrors = [];
        if (error.data && angular.isObject(error.data)) {
            for (var key in error.data) {
                $scope.validationErrors.push(error.data[key][0]);
            }
        } else {
            $scope.validationErrors.push('Could not add movie.');
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