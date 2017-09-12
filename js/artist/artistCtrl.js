angular.module('app')
.controller('artistCtrl', function($scope, $stateParams, mainSrvc) {
  $scope.test = 'Artist';
  $scope.cur = $stateParams;
  // console.log($stateParams);

  mainSrvc.getArtist($stateParams)
  // .then(function(response){
  //     console.log(response);
  // })
});
