spotify.service('mainSrvc', function($http, $sce) {
  var self = this;
  var clientId = '132684ee2f514226955d32a0637b472f';
  var accessToken = 'BQDq4V5qdmjOnQdPffAR4eoArrg2WpAD-VY2w4qHX_3K-dtG2h4MSbVgIKyS_QzXHP5b-0AOCFhXERg3uFbdJ6QID9dHf5RPx4hfG7DPBCYvuD-XgkS23NuzX9TT-H_cWm_WhXSvqs-jDGMLe5RlPx1ZdmDJXbY';

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
    $http.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
    var tracksUrl = "https://api.spotify.com/v1/artists/" + tracks + "/top-tracks?country=US";
    return $http.get(tracksUrl)
    .then(function(response){
      var results = response.data.tracks;
      var tracksArr = [];

      for(var i = 0; i < results.length; i++){
        var obj = {
          artistName: results[i].artists[0].name,
          trackName: results[i].name,
          trackImage: results[i].album.images[0],
          preview: results[i].preview_url,
          duration: results[i].duration_ms,
          link: results[i].uri,
        }
        tracksArr.push(obj);
      }
      return tracksArr;
    })
  }

  this.defaultPreview = function(){
    var trustPreview = $sce.trustAsResourceUrl("https://p.scdn.co/mp3-preview/855e3c8923f2ae2993716af7919d9aeca9511773?cid=132684ee2f514226955d32a0637b472f");
    var obj = {
      artistName: 'ODESZA',
      trackName: "Say My Name (feat. Zyra)",
      trackImage: {
        url: "https://i.scdn.co/image/387b19d3bc6178b7429493f9fdf4f7c8c33aabc5"
      },
      duration: 262956,
      preview: trustPreview
    }
    return obj;
  }

  this.playPreview = function(preview) {
    // console.log(preview);
    var trustPreview = $sce.trustAsResourceUrl(preview.preview);
    var obj = {
      artistName: preview.artistName,
      trackName: preview.trackName,
      trackImage: preview.trackImage,
      duration: preview.duration,
      preview: trustPreview
    }
    console.log('clicked');
    return obj;
  }

  this.test = 'testing';
});
