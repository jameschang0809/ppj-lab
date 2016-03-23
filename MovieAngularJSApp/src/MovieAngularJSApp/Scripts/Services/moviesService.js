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