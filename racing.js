var app = angular.module('handicapperApp', []);


app.factory('Races', function($http){
  console.log('Races');
  var obj = {fixtures: []};

  $http.get("fixtures.json").success(function(data){obj.fixtures = data;});

  var getFixtureRaces = function(fixture){
    $http.get("fixtures/" + fixture.id + ".json").success(function(data){
      fixture.races = data;
    });
  };

  var getRaceResults = function(race){
    $http.get("results/" + race.id + ".json").success(function(data){
      race.results = data;
    });
  };

  obj.getFixtureRaces = getFixtureRaces;
  obj.getRaceResults = getRaceResults;

  return obj;
});


app.factory('People', function($http){
  console.log('People');
  var obj = {};
  
  $http.get("handicappers.json").success(function(data){
    obj.handicappers = data;
  });
  
  return obj;
});


app.controller('FixturesCtrl', ['$scope', 'Races', function($scope, Races) {
  $scope.races = Races;
  
  $scope.selectedFixture = null;
  $scope.selectedRace = null;
  
  $scope.selectFixture = function(fixture){
    $scope.selectedFixture = fixture;
  };
  
  $scope.selectRace = function(race){
    $scope.selectedRace = race;
  };
  
  $scope.unAssigned = function(race){
    return ! race.handicapper;
  };
  
  var ensureFixtureLoaded = function(){
    if($scope.selectedFixture !== null){
    $scope.races.getFixtureRaces($scope.selectedFixture);
    }
  };
  
  var ensureResultsLoaded = function(){
    if($scope.selectedRace !== null){
      $scope.races.getRaceResults($scope.selectedRace);
    }
  };
  
  $scope.$watch('selectedFixture', ensureFixtureLoaded);
  $scope.$watch('selectedRace', ensureResultsLoaded);
}]);

app.controller('AssignmentCtrl', ['$scope', 'People', 'Races', function($scope, People, Races){
  $scope.people = People;
  $scope.races = Races;
  
  $scope.selectedHandicapper = null;
  $scope.selectedRace = null;
  
  $scope.selectHandicapper = function(handicapper){
    $scope.selectedHandicapper = handicapper;
  };

  $scope.selectRace = function(race){
    $scope.selectedRace = race;
  };
  
  $scope.assignRace = function(handicapper, race){
    race.handicapper = handicapper;
  };

  $scope.unAssignRace = function(race){
    race.handicapper = null;
  };
  
}]);

