spotify.controller('bottomPlayCtrl', function($scope, mainSrvc, $routeScope) {
  $scope.test = mainSrvc.test;

  $routeScope.$on('songStorer', function(event, song){
    console.log(song);
  })

  $scope.track = mainSrvc.defaultPreview();
});
