angular
  .module('app')
  .controller('mainCtrl', function($scope, mainSrvc) {

    $scope.searchMusic = function(searchStr){
      mainSrvc.searchMusic(searchStr)
    }





  });




  // Soundcloud

  // $scope.getUser = function() {
  //   mainSrvc.getUser($scope.user).then(function(response) {
  //
  //     console.log(response);
  //   });
  // };

  // $scope.getUser();
