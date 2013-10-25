var app = angular.module('handicapperApp');

 
app.config(function($routeProvider){
  $routeProvider.when("/",
    {
      templateUrl: "assignment.html"
    }
                     ).when("/dashboard/",
                            {
                              templateUrl: "dashboard.html",
                              controller: "DashboardCtrl"
                            }
  );
});

app.controller('NavigationCtrl', ['$scope', '$location',
               function($scope,$location){
                 $scope.locationService = $location;
                 $scope.gotoDashboard = function(){
                   $location.path('/dashboard/');
                 };
                 $scope.gotoAssignments = function(){
                   $location.path('/');
                 };
               }]);