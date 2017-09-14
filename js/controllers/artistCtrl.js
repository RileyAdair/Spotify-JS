spotify.controller('artistCtrl', function($scope, $stateParams, mainSrvc, $sce) {
  // $scope.cur = $stateParams;
  /*============================================================================
                              Get-Artist-and-Tracks
  ============================================================================*/
  mainSrvc.getArtist($stateParams)
  .then(function(response){

      $scope.artist = response;
  })
  mainSrvc.getTracks($stateParams)
  .then(function(response){
      $scope.tracks = response;
  })

  /*============================================================================
                            Pass-Track--Obj-to-Service
  ============================================================================*/
  $scope.playPreview = function(trackObj){
    mainSrvc.playPreview(trackObj);
  }

  /*============================================================================
                                Add-To-Playlist
  ============================================================================*/


});
