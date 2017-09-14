spotify.controller('artistCtrl', function($scope, $stateParams, mainSrvc, $sce) {
  // $scope.cur = $stateParams;
  mainSrvc.getArtist($stateParams)
  .then(function(response){

      $scope.artist = response;
  })
  mainSrvc.getTracks($stateParams)
  .then(function(response){
      $scope.tracks = response;
  })


  $scope.track = mainSrvc.defaultPreview();

  $scope.playPreview = function(trackInfo){
    var trackResults = mainSrvc.playPreview(trackInfo);
    $scope.track = trackResults;
    $('audio').attr('autoplay', 'true');
  }
});
