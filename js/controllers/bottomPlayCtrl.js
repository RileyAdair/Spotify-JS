spotify.controller('bottomPlayCtrl', function($scope, mainSrvc, $rootScope) {
  $scope.test = mainSrvc.test;

  $rootScope.$on('songStorer', function(event, song){
    console.log(song);
    $scope.track = song;
    $('audio').attr('autoplay', 'true');
  })



  $scope.track = mainSrvc.defaultPreview();
});
