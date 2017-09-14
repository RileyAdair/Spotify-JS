spotify.service('mainSrvc', function($http, $sce, $rootScope) {
  var self = this;
  var clientId = '132684ee2f514226955d32a0637b472f';
  var accessToken = 'BQCTTLTTrdMv0s9WmdYuP7apOx3HZvA9V-IzhxADvyNSyd28DBQobvAdwHJlylPJUCjQmgcTLdxfRF8OWDINMNasT-b_M83jaepq7lFWl0my2ic2heMyW4xqOXVS0vmvmbQ69md0I1kkfv-kt43fljqG_W0QT3w';
  this.recent = 'recent';
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
      console.log(response);
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

  /*============================================================================
                              Pass-trackObj-to-bottomPlay
  ============================================================================*/
  this.playPreview = function(preview) {
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
    console.log('new track');
    // for(var i = 0; i < recentArr.length; i++){
    //   if(artistName)
    // }
    this.recentArr.unshift(trackObj);
    this.recentArr.pop();
    // console.log(this.recentArr);
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
      artistName: 'Jai Wof',
      trackName: "Indian Summer",
      trackImage: {
        url: "https://i.scdn.co/image/d247578ffb8aa69273db9e5ae0371ab59b43bd20"
      },
      duration: 248470,
      preview: $sce.trustAsResourceUrl("https://p.scdn.co/mp3-preview/7e9ae33b812a6a80652c6c3226cbafaad8bfb689?cid=132684ee2f514226955d32a0637b472f")
    },
    {
      artistName: 'Jai Wof',
      trackName: "Indian Summer",
      trackImage: {
        url: "https://i.scdn.co/image/d247578ffb8aa69273db9e5ae0371ab59b43bd20"
      },
      duration: 248470,
      preview: $sce.trustAsResourceUrl("https://p.scdn.co/mp3-preview/7e9ae33b812a6a80652c6c3226cbafaad8bfb689?cid=132684ee2f514226955d32a0637b472f")
    },
    {
      artistName: 'Jai Wof',
      trackName: "Indian Summer",
      trackImage: {
        url: "https://i.scdn.co/image/d247578ffb8aa69273db9e5ae0371ab59b43bd20"
      },
      duration: 248470,
      preview: $sce.trustAsResourceUrl("https://p.scdn.co/mp3-preview/7e9ae33b812a6a80652c6c3226cbafaad8bfb689?cid=132684ee2f514226955d32a0637b472f")
    },

  ];

  /*============================================================================
                            Add-to / Delete-from-playlist
  ============================================================================*/
  this.addTrack = function(trackObj){
    this.newPlaylistArr.unshift(trackObj);
    console.log(this.newPlaylistArr);
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
    console.log('old track');
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
      artistName: 'Jai Wof',
      trackName: "Indian Summer",
      trackImage: {
        url: "https://i.scdn.co/image/d247578ffb8aa69273db9e5ae0371ab59b43bd20"
      },
      duration: 248470,
      preview: $sce.trustAsResourceUrl("https://p.scdn.co/mp3-preview/7e9ae33b812a6a80652c6c3226cbafaad8bfb689?cid=132684ee2f514226955d32a0637b472f")
    }
  ];

});
