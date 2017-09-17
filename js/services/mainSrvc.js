spotify.service('mainSrvc', function($http, $sce, $rootScope) {
  var self = this;
  var clientId = '132684ee2f514226955d32a0637b472f';
  var accessToken = 'BQDslbHJUSsErX_yBHT6HEtgHKqFvp7qYGqp59Ty4NRjaf52fUKmkJZsGuQxemD1T-DYOKbGA0iqUK3PBoyWbXKrCo7Bz2sSG25UeBG9ReP46opqwrIL6X3-jQwwRtMJ3NtglU7lnGthsGzzKIwcI4BenZ3BZ8A';

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
        followers: results.followers.total.toLocaleString(),
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

        var duration = results[i].duration_ms

        var convertDuration = function (millis) {
          var minutes = Math.floor(millis / 60000);
          var seconds = ((millis % 60000) / 1000).toFixed(0);
          return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        }

        duration = convertDuration(duration);
        // console.log(duration);

        var obj = {
          number: i + 1 + '.',
          artistName: results[i].artists[0].name,
          trackName: results[i].name,
          trackImage: results[i].album.images[0],
          preview: results[i].preview_url,
          duration: duration,
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
      artistName: 'Jai Wolf',
      trackName: "Indian Summer",
      trackImage: {
        url: "https://i.scdn.co/image/d247578ffb8aa69273db9e5ae0371ab59b43bd20"
      },
      duration: 248470,
      preview: $sce.trustAsResourceUrl("https://p.scdn.co/mp3-preview/7e9ae33b812a6a80652c6c3226cbafaad8bfb689?cid=132684ee2f514226955d32a0637b472f")
    }
    return obj;
  }

  /*============================================================================
                              Pass-trackObj-to-bottomPlay
  ============================================================================*/
  this.playPreview = function(preview) {
    if(preview.preview){
      // $sce to inject url
      var trustPreview = $sce.trustAsResourceUrl(preview.preview);

      var trackObj = {
        artistName: preview.artistName,
        trackName: preview.trackName,
        trackImage: preview.trackImage,
        duration: preview.duration,
        preview: trustPreview
      }
      // Emit fires and passes trackObj on $rooteScope
      $rootScope.$emit('songStorer', trackObj)

      var playlistCheck = this.recentArr;
      for(var i = 0; i < playlistCheck.length; i++) {
        if(playlistCheck[i].trackName == trackObj.trackName) {
          return;
        }
      }
      this.recentArr.unshift(trackObj);
      this.recentArr.pop();
    }

    // make this a function that animates in at the top
    else console.log('Spotify api is not providing this track');

  }

  /*============================================================================
                              Play-recently-played-track
  ============================================================================*/
  this.playRecentPreview = function(preview) {
    $rootScope.$emit('songStorer', preview)
  }

  /*============================================================================
                              Recently-played-array
  ============================================================================*/
  this.recentArr = [
    {
      artistName: 'Jai Wolf',
      trackName: "Indian Summer",
      trackImage: {
        url: "https://i.scdn.co/image/d247578ffb8aa69273db9e5ae0371ab59b43bd20"
      },
      duration: 248470,
      preview: $sce.trustAsResourceUrl("https://p.scdn.co/mp3-preview/7e9ae33b812a6a80652c6c3226cbafaad8bfb689?cid=132684ee2f514226955d32a0637b472f")
    },
    {
      artistName: 'ODESZA',
      trackName: "Say My Name (feat. Zyra)",
      trackImage: {
        url: "https://i.scdn.co/image/387b19d3bc6178b7429493f9fdf4f7c8c33aabc5"
      },
      duration: 262956,
      preview: $sce.trustAsResourceUrl("https://p.scdn.co/mp3-preview/855e3c8923f2ae2993716af7919d9aeca9511773?cid=132684ee2f514226955d32a0637b472f")
    },
    {
      artistName: 'Keys N Krates',
      trackName: "I Just Can't Deny",
      trackImage: {
        url: "https://i.scdn.co/image/eca1de5f0e6ec4b581659e8b5d218b9692d67c40"
      },
      duration: 240000,
      preview: $sce.trustAsResourceUrl("https://p.scdn.co/mp3-preview/0ba1568c07e51cb16832ee1699c45b9f0b70fe00?cid=132684ee2f514226955d32a0637b472f")
    },
    {
      artistName: 'Jai Wolf',
      trackName: "Indian Summer",
      trackImage: {
        url: "https://i.scdn.co/image/d247578ffb8aa69273db9e5ae0371ab59b43bd20"
      },
      duration: 248470,
      preview: $sce.trustAsResourceUrl("https://p.scdn.co/mp3-preview/7e9ae33b812a6a80652c6c3226cbafaad8bfb689?cid=132684ee2f514226955d32a0637b472f")
    },
    {
      artistName: 'Jai Wolf',
      trackName: "Indian Summer",
      trackImage: {
        url: "https://i.scdn.co/image/d247578ffb8aa69273db9e5ae0371ab59b43bd20"
      },
      duration: 248470,
      preview: $sce.trustAsResourceUrl("https://p.scdn.co/mp3-preview/7e9ae33b812a6a80652c6c3226cbafaad8bfb689?cid=132684ee2f514226955d32a0637b472f")
    }
  ];

  /*============================================================================
                            Add-to / Delete-from-playlist
  ============================================================================*/
  this.addTrack = function(trackObj,){
    this.newPlaylistArr.unshift(trackObj);
    // console.log(this.newPlaylistArr);
  }
  this.deleteNewTrack = function(trackObj){
    this.newPlaylistArr.splice(trackObj,1);
  }

  this.deleteTrack = function(trackObj){
    this.playlistArr.splice(trackObj,1);
  }

  /*============================================================================
                            Play-playlist-track
  ============================================================================*/
  this.playPlaylistPreview = function(preview) {
    $rootScope.$emit('songStorer', preview)
    // console.log('old track');
  }

  /*============================================================================
                              Playlist-array
  ============================================================================*/
  this.newPlaylistArr = [];

  this.playlistArr = [
    {
      artistName: 'ODESZA',
      trackName: "Say My Name (feat. Zyra)",
      trackImage: {
        url: "https://i.scdn.co/image/387b19d3bc6178b7429493f9fdf4f7c8c33aabc5"
      },
      duration: 262956,
      preview: $sce.trustAsResourceUrl("https://p.scdn.co/mp3-preview/855e3c8923f2ae2993716af7919d9aeca9511773?cid=132684ee2f514226955d32a0637b472f")
    },
    {
      artistName: 'Keys N Krates',
      trackName: "I Just Can't Deny",
      trackImage: {
        url: "https://i.scdn.co/image/eca1de5f0e6ec4b581659e8b5d218b9692d67c40"
      },
      duration: 240000,
      preview: $sce.trustAsResourceUrl("https://p.scdn.co/mp3-preview/0ba1568c07e51cb16832ee1699c45b9f0b70fe00?cid=132684ee2f514226955d32a0637b472f")
    },
    {
      artistName: 'Jai Wolf',
      trackName: "Indian Summer",
      trackImage: {
        url: "https://i.scdn.co/image/d247578ffb8aa69273db9e5ae0371ab59b43bd20"
      },
      duration: 248470,
      preview: $sce.trustAsResourceUrl("https://p.scdn.co/mp3-preview/7e9ae33b812a6a80652c6c3226cbafaad8bfb689?cid=132684ee2f514226955d32a0637b472f")
    }
  ];

  /*============================================================================
                            Featured-playlists-request
  ============================================================================*/
  this.getFeatured = function(){
    $http.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
    var searchUrl = "https://api.spotify.com/v1/browse/featured-playlists";

    return $http.get(searchUrl)

    .then(function(response){

      var results = response.data.playlists.items;
      var playlistsArr = [];

      for(var i = 0; i < results.length; i++){
        if(results[i].name){
          var obj = {
            name: results[i].name,
            image: results[i].images[0],
            id: results[i].id,
            tracks: results[i].tracks.href,
          }
          playlistsArr.push(obj);
        }
      }
      return playlistsArr;
    })
  }

  this.getFeaturedMessage = function(){
    $http.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
    var searchUrl = "https://api.spotify.com/v1/browse/featured-playlists";

    return $http.get(searchUrl)

    .then(function(response){

      var results = response.data.message;

      return results;
    })
  }

  /*============================================================================
                                Playlists-info-request
  ============================================================================*/

  this.getPlaylistInfo = function(tracks){
    var tracks = (tracks.id);
    $http.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
    var searchUrl = "https://api.spotify.com/v1/users/spotify/playlists/" + tracks;

    return $http.get(searchUrl)

    .then(function(response){
      // console.log(results);
      var results = response.data;

      var playlistObj = {
        name: results.name,
        image: results.images[0],
        owner: results.owner.display_name,
        description: results.description,
        link: results.external_urls.spotify,
        trackTotal: results.tracks.total,
        id: results.id
      }

      return (playlistObj);
    })
  }


  this.getPlaylistTracks = function(tracks){
    var tracks = (tracks.id);
    $http.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
    var searchUrl = "https://api.spotify.com/v1/users/spotify/playlists/" + tracks;

    return $http.get(searchUrl)

    .then(function(response){
      var results = response.data.tracks.items;
      var tracksArr = [];

      for(var i = 0; i < results.length; i++){
        var duration = results[i].track.duration_ms

        var convertDuration = function (millis) {
          var minutes = Math.floor(millis / 60000);
          var seconds = ((millis % 60000) / 1000).toFixed(0);
          return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        }
        duration = convertDuration(duration);
        // console.log(duration);

        var obj = {
          number: i + 1 + '.',
          trackName: results[i].track.name,
          duration: duration,
          trackImage: results[i].track.album.images[0],
          artistName: results[i].track.artists[0].name,
          trackArtistId: results[i].track.artists[0].id,
          preview: results[i].track.preview_url,
        }
        tracksArr.push(obj);

      }
      return tracksArr;
    })
  }

});
