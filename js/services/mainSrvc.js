spotify.service('mainSrvc', function($http, $sce) {
  var self = this;
  var clientId = '132684ee2f514226955d32a0637b472f';
  var accessToken = 'BQA2nw5UJ0sbk-pBvi_jHbKpGiBGFPsSZldF6z5oAboCI-gdFZJ295nLiC2lDmpgWq7ojqF1fY1kaLK75Rg0Tmr_XePbxihEa7058iQrbvuwvBgSoI42dq-sE2ZVJFAdpdhoyBujTZi8wCwiq8ONMX1ElTH7Gwg';

  this.searchMusic = function(str){
    $http.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
    var searchUrl = "https://api.spotify.com/v1/search?type=artist&limit=12&client_id" + clientId + '&q=' + str;

    return $http.get(searchUrl)

    .then(function(response){
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
      var results = response.data;
      var obj = {
        name: results.name,
        followers: results.followers.total,
        followLink: results.external_urls.spotify,
        image: results.images[0]
      }
      // console.log(obj);
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
      // console.log(response.data);
      var results = response.data.tracks;
      var tracksArr = [];

      for(var i = 0; i < results.length; i++){
        var obj = {
          artistName: results[i].artists[0].name,
          trackName: results[i].name,
          preview: results[i].preview_url,
          duration: results[i].duration_ms,
          link: results[i].uri,
          // image: results[i].
        }
        tracksArr.push(obj);
      }
      return tracksArr;
    })
  }


  this.playPreview = function(preview) {
    var trustPreview = $sce.trustAsResourceUrl(preview.preview);
    var obj = {
      artistName: preview.artistName,
      trackName: preview.trackName,
      duration: preview.duration,
      preview: trustPreview
    }
    return obj;
  }

  this.test = 'testing';
});
