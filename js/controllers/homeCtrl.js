spotify.controller('homeCtrl', function($scope, mainSrvc, $rootScope) {
  $rootScope.homeActive = function(){
  }

  mainSrvc.getFeatured()
  .then(function(response){
      $scope.playlists = response;
  })

  mainSrvc.getFeaturedMessage()
  .then(function(response){
      $scope.message = response;
  })
});
