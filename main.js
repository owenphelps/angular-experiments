var app = angular.module('handicapperApp');

 
app.config(function($routeProvider){
  $routeProvider.when("/",
    {
      templateUrl: "assignment.html"
    }
  );
});
