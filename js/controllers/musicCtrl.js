spotify.controller('musicCtrl', function($scope, mainSrvc, $rootScope) {
  $rootScope.musicActive = function(){
  }

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

  // Changes active track color to green
  $rootScope.selected = -1;
  $rootScope.selectToggle = function(index) {
    $rootScope.selected = index;
  }

  // Changes active track color to green
  $rootScope.previousSelected = -1;
  $rootScope.previousSelectToggle = function(index) {
    $rootScope.previousSelected = index;
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
