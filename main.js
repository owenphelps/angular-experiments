angular.module('handicapperApp', ['ngRoute'])
.config(function($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "assignment.html"
    }).when("/dashboard/", {
        templateUrl: "dashboard.html",
        controller: "DashboardCtrl"
    });
})
.controller('NavigationCtrl', ['$scope', '$location',
    function($scope, $location) {
        $scope.activePage = 'assignments';
        $scope.locationService = $location;
        $scope.gotoDashboard = function() {
            $location.path('/dashboard/');
            $scope.activePage = 'dashboard';
        };
        $scope.gotoAssignments = function() {
            $location.path('/');
            $scope.activePage = 'assignments';
        };
    }
])
;