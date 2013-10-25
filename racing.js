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

  var getHandicapperRaces = function(handicapper){
    handicapper.races = [];
    $http.get("handicapper_races/" + handicapper.id + ".json").success(function(data){
      handicapper.races = data;
      console.log(data);
    });
  };
  obj.getFixtureRaces = getFixtureRaces;
  obj.getRaceResults = getRaceResults;
  obj.getHandicapperRaces = getHandicapperRaces;

  return obj;
});

app.factory('filterService', function(){
  return { activeFilters: {} };
});

app.factory('raceSelectionService', function(){
  return {race: null};
});

app.factory('fixtureSelectionService', function(){
  return {fixture: null};
});

app.factory('People', function($http){
  console.log('People');
  var obj = {};
  
  $http.get("handicappers.json").success(function(data){
    obj.handicappers = data;
  });
  
  return obj;
});


app.controller('FixturesCtrl', ['$scope', 'Races', 'filterService', 'raceSelectionService', 'fixtureSelectionService',
                                function($scope, Races, filterService, raceSelectionService, fixtureSelectionService) {
  $scope.races = Races;
  
  $scope.filterService = filterService;
  $scope.raceSelectionService = raceSelectionService;
  $scope.fixtureSelectionService = fixtureSelectionService;

  $scope.selectedFixture = null;
  $scope.selectedRace = null;
  
  $scope.selectFixture = function(fixture){
    $scope.fixtureSelectionService.fixture = fixture;
  };
  
  $scope.selectRace = function(race){
    $scope.raceSelectionService.race = race;
  };
  
  $scope.unAssigned = function(race){
    return ! race.handicapper;
  };
  
  var ensureFixtureLoaded = function(){
    if($scope.fixtureSelectionService.fixture !== null){
    $scope.races.getFixtureRaces($scope.fixtureSelectionService.fixture);
    }
  };
  
  var ensureResultsLoaded = function(){
    if($scope.raceSelectionService.race !== null){
      $scope.races.getRaceResults($scope.raceSelectionService.race);
    }
  };
  
  $scope.$watch('fixtureSelectionService.fixture', ensureFixtureLoaded);
  $scope.$watch('raceSelectionService.race', ensureResultsLoaded);
}]);

app.controller('AssignmentCtrl',
               ['$scope', 'People', 'Races', 'raceSelectionService', 'fixtureSelectionService',
                function($scope, People, Races, raceSelectionService, fixtureSelectionService){
  $scope.people = People;
  $scope.races = Races;
  
  $scope.raceSelectionService = raceSelectionService;
  $scope.fixtureSelectionService = fixtureSelectionService;
                
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

app.controller('DashboardCtrl',
               ['$scope', 'People', 'Races', 
                function($scope, People, Races){
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

  var ensureRacesLoaded = function(){
    if($scope.selectedHandicapper !== null){
    $scope.races.getHandicapperRaces($scope.selectedHandicapper);
    }
  };
  
  $scope.$watch('selectedHandicapper', ensureRacesLoaded);                  
                  
}]);

