spotify.controller('playlistCtrl', function($scope, $stateParams, mainSrvc, $rootScope) {

  $rootScope.tracklistShow = function(){
    $('body').on('mouseenter','.tracklist-row', function(){
      $(this).find('.tracklist-add').addClass('active');
      // $(this).find('.tracklist-play-pause').addClass('active');
      // $(this).find('.position').addClass('hide');

    });
  }

  $rootScope.tracklistHide = function(){
    $('body').on('mouseleave','.tracklist-row', function(){
      $(this).find('.tracklist-add').removeClass('active');
      // $(this).find('.tracklist-play-pause').removeClass('active');
      // $(this).find('.position').removeClass('hide');
    });
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
