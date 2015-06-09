/*global angular, BookListCtrl, BookDetailCtrl */


/**
 * @see http://docs.angularjs.org/guide/concepts
 */

var myApp = angular.module('myApp', ['myApp.services', 'ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {

        // Get all books
        $routeProvider.when('/books', {
            templateUrl: 'partials/book-list.html',
            controller: BookListCtrl
        });

        // Get, Save 1 book
        $routeProvider.when('/books/:_id', {
            templateUrl: 'partials/book-detail.html',
            controller: BookDetailCtrl
        });

        //When no valid route is provided
        $routeProvider.otherwise({
            redirectTo: "/books"
        });

    }]);