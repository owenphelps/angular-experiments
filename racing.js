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

app.factory('filterService', function(){
  return { activeFilters: {} };
});

app.factory('raceSelectionService', function(){
  return {race: null};
});

app.factory('People', function($http){
  console.log('People');
  var obj = {};
  
  $http.get("handicappers.json").success(function(data){
    obj.handicappers = data;
  });
  
  return obj;
});


app.controller('FixturesCtrl', ['$scope', 'Races', 'filterService', 'raceSelectionService', function($scope, Races, filterService, raceSelectionService) {
  $scope.races = Races;
  
  $scope.filterService = filterService;
  $scope.raceSelectionService = raceSelectionService;

  $scope.selectedFixture = null;
  $scope.selectedRace = null;
  
  $scope.selectFixture = function(fixture){
    $scope.selectedFixture = fixture;
  };
  
  $scope.selectRace = function(race){
    $scope.raceSelectionService.race = race;
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
    if($scope.raceSelectionService.race !== null){
      $scope.races.getRaceResults($scope.raceSelectionService.race);
    }
  };
  
  $scope.$watch('selectedFixture', ensureFixtureLoaded);
  $scope.$watch('raceSelectionService.race', ensureResultsLoaded);
}]);

app.controller('AssignmentCtrl', ['$scope', 'People', 'Races', 'raceSelectionService', function($scope, People, Races, raceSelectionService){
  $scope.people = People;
  $scope.races = Races;
  
  $scope.raceSelectionService = raceSelectionService;
  $scope.selectedHandicapper = null;
  
  $scope.selectHandicapper = function(handicapper){
    $scope.selectedHandicapper = handicapper;
  };

  $scope.selectRace = function(race){
    $scope.raceSelectionService.race = race;
  };
  
  $scope.assignRace = function(handicapper, race){
    race.handicapper = handicapper;
  };

  $scope.unAssignRace = function(race){
    race.handicapper = null;
  };
  
}]);

