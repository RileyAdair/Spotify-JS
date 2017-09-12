angular.module('app').service('mainSrvc', function($http, $q) {
  var self = this;
  var clientId = '132684ee2f514226955d32a0637b472f';
  var accessToken = 'BQBh8GVtAMdVR7vDNAIdVj7js4ieFAuFb9lB-EbP7HicXeFf-2mWC9bE_OOh_nnSpOO-zZ3PTIdbY8BNxcv-mD9BtGXg_lOloxSpGWS7AWs-c3pv-otF7TA5REPeMtaMvCntOZwhshptfNPTjG5e5_IVa73u0zo';

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
          image: results[i].images[0] || {url:"../img/default-icon.jpg"}
        }
        artistArr.push(obj);
      }
      return artistArr;
    })
  }
});
