spotify.controller('playlistCtrl', function($scope, $stateParams, mainSrvc, $rootScope) {

  // Shows Saved to Your Music message
  $rootScope.showMessage = mainSrvc.showMessage;

  // Changes active track color to green
  $rootScope.selected = -1;
  $rootScope.selectToggle = function(index) {
    $rootScope.selected = index;
  }

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
      $scope.songLength = response.length;
      console.log(response.length);
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
