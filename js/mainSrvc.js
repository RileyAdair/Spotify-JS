angular.module('app').service('mainSrvc', function($http, $q) {
  var self = this;
  var clientId = '132684ee2f514226955d32a0637b472f';



  var accessToken = 'BQCUd2rack-8_AcULjqV7tJR-q1FUljc6tj3-yOHsjeFxldmp4G7VRBvIBy6RaVSt2b-mu-R6g6uG1b_hFcnMBAiDJMYqKDOZT7oZIZdpEbe44nk1kZ7JQIBnDXcR540Yjniixk3OxfA9ls851Dbv1y6Ftog-3s';

  this.searchMusic = function(str){
    $http.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
    var searchUrl = "https://api.spotify.com/v1/search?type=artist&limit=10&client_id" + clientId + '&q=' + str;
    //

    var data = $http.get(searchUrl);
    console.log(data);
  }

// $http.defaults.headers.common.Authorization = 'Bearer BQB6u_Wj3TR-9FH1SyyK-3VdDEO8TUS4o4JkSOTHufQDooGpSURbdhTxerCWRdug3gcynxMNx1dKT12DXjn--7q-KH4FJcB6r8HRuMH-3tXO27TbDsCjibIzrjcNdJfAtSZVLG5F-l51e-OIo8UTK-KJoqpjgN0&refresh_token=AQC0gtXcwm09Ux9e0KO7cfM7p-O-oQbyBqcY71iCuAqu6Ai84J3NhOedm5H3MlwtvCFlF3OM6Z-3dkusvPdpGBIoZqNHYv7AVkuupryPEJQO1-GdtuRXubvmh1wNGTtCoG4';




});


// spotify client_id: 132684ee2f514226955d32a0637b472f
// client secret: 68e6ce0b298643fdab881993e4f8bed8


// Souncloud


// var searchUrl = 'https://api.soundcloud.com/tracks/?client_id=b23455855ab96a4556cbd0a98397ae8c&q=';
// var baseurl = 'https://api.soundcloud.com/users/';
// var cliendId = '/tracks.json?client_id=bda4ada8694db06efcac9cf97b872b3e';


// this.getUser = function(username) {
//   return $http.get(baseurl + username)
//   // return $http.get(baseurl + username + cliendId)
// };
