angular.module('app')
.controller('artistCtrl', function($scope, $stateParams, mainSrvc, $sce) {
  $scope.cur = $stateParams;
  // console.log($stateParams);


  mainSrvc.getArtist($stateParams)
  .then(function(response){
      console.log(response);
      $scope.artist = response;
  })

  mainSrvc.getTracks($stateParams)
  .then(function(response){
      console.log(response);
      $scope.tracks = response;
  })

  $scope.playSong = function(preview){
    console.log(preview);
    // $scope.preview = preview;
    $scope.url = $sce.trustAsResourceUrl(preview);
    // var audio = new Audio(preview);
    //     audio.play();
    // var audio = new Audio($scope.url);
    // audio.play();
  }



});
