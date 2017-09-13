spotify.controller('mainCtrl', function($scope, mainSrvc) {
  $scope.test = mainSrvc.test;


  $scope.currentTrack = mainSrvc.currentTrack;

  $scope.log = function(){
    console.log($scope.test);
  }

  // console.log(trackResults);
  // $scope.track = trackResults;
});
