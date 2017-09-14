spotify.controller('recentPlayCtrl', function($scope, mainSrvc) {
  $scope.recentArr = mainSrvc.recentArr;
  // console.log($scope.recentArr);

  /*============================================================================
                            Pass-trackObj-to-service
  ============================================================================*/
  $scope.playPreview = function(trackObj){
    mainSrvc.playRecentPreview(trackObj);
  }
});
