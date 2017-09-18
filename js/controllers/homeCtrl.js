spotify.controller('homeCtrl', function($scope, mainSrvc, $rootScope) {
  $rootScope.homeActive = function(){
  }

  mainSrvc.getFeatured()
  .then(function(response){
      $scope.playlists = response;
      // console.log(response);
  })

  mainSrvc.getFeaturedMessage()
  .then(function(response){
      $scope.message = response;
      // console.log(response);
  })
});
