spotify.controller('musicCtrl', function($scope, mainSrvc, $rootScope) {
  $rootScope.musicActive = function(){
    setTimeout(function(){ $('input').focus(); }, 100);
    $('#music').css('color','#1db954');
    $('.navBar-group-search').css('color','hsla(0,0%,100%,.6)');
    $('#home').css('color','hsla(0,0%,100%,.6)');
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
