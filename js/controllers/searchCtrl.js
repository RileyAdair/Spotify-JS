spotify.controller('searchCtrl', function($scope, mainSrvc, $rootScope) {
  $rootScope.inputFocus = function(){
    setTimeout(function(){ $('input').focus(); }, 100);
    $('.navBar-group-search').css('color','#1db954');
    $('#home').css('color','hsla(0,0%,100%,.6)');
    $('#music').css('color','hsla(0,0%,100%,.6)');
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
