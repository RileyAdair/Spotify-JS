spotify.controller('searchCtrl', function($scope, mainSrvc, $rootScope) {
  $rootScope.inputFocus = function(){
    setTimeout(function(){ $('input').focus(); }, 100);
  }

    $scope.searchMusic = function(searchStr){
      if(searchStr){
        mainSrvc.searchMusic(searchStr).then(function(response){
          // console.log(response);
          $scope.artists = response;
        })

      }
      else {
        $scope.artists = '';
      }
    }

  });
