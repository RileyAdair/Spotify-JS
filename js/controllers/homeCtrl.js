spotify.controller('homeCtrl', function($scope, mainSrvc) {
  $scope.homeFocus = function(){
    setTimeout(function(){ $('input').focus(); }, 100);
    $('.home').css('color','#1db954');
    $('.navBar-group-search').css('color','#fff');
  }
  $scope.test = 'Featured';
});
