spotify.controller('playlistCtrl', function($scope, $stateParams, mainSrvc) {
  /*============================================================================
                            Get-playlist-info-and-tracks
  ============================================================================*/
  mainSrvc.getPlaylistInfo($stateParams)
  .then(function(response){
      $scope.playlistInfo = response;
      // console.log(response);
  })

  mainSrvc.getPlaylistTracks($stateParams)
  .then(function(response){
      $scope.playlistTracks = response;
      // console.log(response);
  })

  /*============================================================================
                            Pass-trackObj-to-service
  ============================================================================*/
  $scope.playPreview = function(trackObj){
    mainSrvc.playPreview(trackObj);
  }

  /*============================================================================
                                Add-to-playlist
  ============================================================================*/
  $scope.addTrack = function(trackObj){
    mainSrvc.addTrack(trackObj);
  }

});
