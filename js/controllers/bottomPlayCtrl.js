spotify.controller('bottomPlayCtrl', function($scope, mainSrvc, $rootScope) {

  $rootScope.$on('songStorer', function(event, track){
    // console.log(track);
    $scope.track = track;
    $('audio').attr('autoplay', 'true');
  })

  // $rootScope.$on('songRecentStorer', function(event, track){
  //   // console.log(track);
  //   $scope.track = track;
  //   $('audio').attr('autoplay', 'true');
  // })

  $scope.track = mainSrvc.defaultPreview();
});
