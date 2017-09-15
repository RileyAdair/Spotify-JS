spotify.controller('searchCtrl', function($scope, mainSrvc) {
  $scope.inputFocus = function(){
    setTimeout(function(){ $('input').focus(); }, 100);
    $('.navBar-group-search').css('color','#1db954');

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
