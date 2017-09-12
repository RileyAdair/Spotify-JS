angular.module('app').service('mainSrvc', function($http, $q) {
  var self = this;
  var clientId = '132684ee2f514226955d32a0637b472f';
  var accessToken = 'BQDaf-HznxHmw5YYLFsncY4AOeuGcYBJHRyB3ebduYIddBvxwYa9YD_WIH36KfKrqy5HpmHCx2Mo-eOk7k-O2_0rNwumvG3O-6j_LXWRhJpjtu9XNBnW6CtqD6RqyW1NJFXt54Rg7OAwSgA57fnoj_Wdwd23sHo';

  this.searchMusic = function(str){
    $http.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
    var searchUrl = "https://api.spotify.com/v1/search?type=artist&limit=12&client_id" + clientId + '&q=' + str;

    return $http.get(searchUrl)

    .then(function(response){
      // console.log(response);
      var results = response.data.artists.items;
      var artistArr = [];

      for(var i = 0; i < results.length; i++){
        var obj = {
          name: results[i].name,
          image: results[i].images[0] || {url:"../img/default-icon.jpg"},
          id: results[i].id
        }
        artistArr.push(obj);
      }
      return artistArr;
    })
  }

  this.getArtist = function(artist){
    var artist = artist.id;
    // console.log(artist);
    $http.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
    var artistUrl = "https://api.spotify.com/v1/artists/" + "3TVXtAsR1Inumwj472S9r4/" + "top-tracks&client_id" + clientId;

    return $http.get(artistUrl);
  }
});
