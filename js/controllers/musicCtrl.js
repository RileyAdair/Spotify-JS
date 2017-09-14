spotify.controller('musicCtrl', function($scope, mainSrvc) {
  $scope.tracks = mainSrvc.playlistArr;

  $scope.newTracks = mainSrvc.newPlaylistArr;

  $scope.deleteNewTrack = function(trackObj){
    mainSrvc.deleteNewTrack(trackObj);
    console.log('delete new track');
  }

  $scope.deleteTrack = function(trackObj){
    mainSrvc.deleteTrack(trackObj);
    console.log('delete old track');
  }

  /*============================================================================
                            Pass-trackObj-to-service
  ============================================================================*/
  $scope.playPreview = function(trackObj){
    mainSrvc.playPlaylistPreview(trackObj);
  }

  $scope.playNewPreview = function(trackObj){
    mainSrvc.playPreview(trackObj);
  }
});
