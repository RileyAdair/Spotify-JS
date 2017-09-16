spotify.controller('homeCtrl', function($scope, mainSrvc, $rootScope) {
  $rootScope.homeActive = function(){
    setTimeout(function(){ $('input').focus(); }, 100);
    $('#home').css('color','#1db954');
    $('.navBar-group-search').css('color','hsla(0,0%,100%,.6)');
    $('#music').css('color','hsla(0,0%,100%,.6)');
  }

  mainSrvc.getFeatured()
  .then(function(response){
      $scope.playlists = response;
      console.log(response);
  })

  mainSrvc.getFeaturedMessage()
  .then(function(response){
      $scope.message = response;
      // console.log(response);
  })
});
