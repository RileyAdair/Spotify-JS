spotify.controller('artistCtrl', function($scope, $stateParams, mainSrvc, $sce) {
  $scope.cur = $stateParams;
  // console.log($stateParams);


  mainSrvc.getArtist($stateParams)
  .then(function(response){

      $scope.artist = response;
  })

  mainSrvc.getTracks($stateParams)
  .then(function(response){
      $scope.tracks = response;
  })

  // $scope.playPreview = function(trackInfo){
  //   console.log('clicked');
  //   mainSrvc.playPreview(trackInfo);
  // }
  $scope.playPreview = function(trackInfo){

    var trackResults = mainSrvc.playPreview(trackInfo);
    $scope.track = trackResults;

  }
});
