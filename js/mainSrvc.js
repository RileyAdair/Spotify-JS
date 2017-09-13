angular.module('app').service('mainSrvc', function($http, $q) {
  var self = this;
  var clientId = '132684ee2f514226955d32a0637b472f';
  var accessToken = 'BQCFPueTMQluNAxS4mUBsQEy7Got-6kw6wz8zqXHFVGBKQuqRXg9gEVIZ8KhwgN2Y_nVyLoj5fAeH2UsiNBoFH9Lw0le9rYlioUUnD685HyYmOXRiUzTGjPS-_v-6Y7fPkBgiaAtX7dpZl0k6JX-DjovnzKYSss';

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
    // console.log(tracks);
    $http.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
    var artistUrl = "https://api.spotify.com/v1/artists/" + artist;
    return $http.get(artistUrl)
    .then(function(response){
      var obj = {
        name: response.data.name,
        image: response.data.images[0]
      }
      return obj;
    })
  }

  this.getTracks = function(tracks){
    var tracks = tracks.id;
    // console.log(tracks);
    $http.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
    var tracksUrl = "https://api.spotify.com/v1/artists/" + tracks + "/top-tracks?country=US";
    return $http.get(tracksUrl)
    .then(function(response){
      var results = response.data.tracks;
      var tracksArr = [];

      for(var i = 0; i < results.length; i++){
        var obj = {
          name: results[i].name,
          preview: results[i].preview_url,
          duration: results[i].duration_ms,
          link: results[i].uri
        }
        tracksArr.push(obj);
      }
      return tracksArr;
    })
  }
});
