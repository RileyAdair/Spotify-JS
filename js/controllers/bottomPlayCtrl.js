spotify.controller('bottomPlayCtrl', function($scope, mainSrvc, $rootScope) {

  $rootScope.$on('songStorer', function(event, track){

    // Toggle Play/Pause button in bottomPlay from Tracklist-Play buttons
    $scope.track = track;
    var pauseButton = document.getElementById("pause");
    $scope.$watch('track',function(newValue, oldValue) {
      if(newValue != oldValue) {

        if(pauseButton.innerText === "Play"){
          audioTrack.play();
          pauseButton.style.transform = 'translateX(-1.3px)';
        }
        else if(pauseButton.innerText === "Pause") {
          audioTrack.pause();
          setText(pauseButton, "Play");
          pauseButton.removeAttribute('style');
        }

      }
      else {
        if(pauseButton.innerText === "Play"){
          audioTrack.play();
          setText(pauseButton, "Pause");
          pauseButton.style.transform = 'translateX(-1.3px)';
          // console.log(pauseButton);
        }
        else if(pauseButton.innerText === "Pause") {
          audioTrack.pause();
          setText(pauseButton, "Play");
          pauseButton.removeAttribute('style');
        }
      }

    },true);

  })

  $scope.track = mainSrvc.defaultPreview();

  // bottomPlay controls
  function player() {
    var pauseButton = document.getElementById("pause");
    if (audioTrack.paused) {
    setText(this, "Pause");
    pauseButton.style.transform = 'translateX(-1.3px)';
    audioTrack.play();
    } else {
    setText(this,"Play");
    pauseButton.removeAttribute('style');
    audioTrack.pause();
    }
  }

  function setText(el,text) {
    el.innerHTML = text;
  }

  function finish() {
      audioTrack.currentTime = 0;
      setText(playButton,"Play");
  }

  function updatePlayhead() {
  	playhead.value = audioTrack.currentTime;
  	var s = parseInt(audioTrack.currentTime % 60);
      var m = parseInt((audioTrack.currentTime / 60) % 60);
      s = (s >= 10) ? s : "0" + s;
      m = (m >= 10) ? m : "0" + m;
      playbacktime.innerHTML = m + ':' + s ;

  }

  function volumizer() {
    if (audioTrack.volume == 0) { setText(muteButton,"volume"); }
    else { setText(muteButton,"volumehigh"); }
  }

  function muter() {
    if (audioTrack.volume == 0) {
      audioTrack.volume = restoreValue;
      volumeSlider.value = restoreValue;
    } else {
      audioTrack.volume = 0;
      restoreValue = volumeSlider.value;
      volumeSlider.value = 0;
    }
  }

  function setAttributes(el, attrs) {
    for(var key in attrs){
      el.setAttribute(key, attrs[key]);
    }
  }

  var audioPlayer = document.getElementById("audioplayer"),
  fader = document.getElementById("fader"),
  playback = document.getElementById("playback"),
  playbar = document.getElementById("playbar"),
  audioTrack = document.getElementById("audiotrack"),
  playbackTime = document.getElementById("playbacktime"),
  playButton = document.createElement("button"),
  muteButton = document.createElement("button"),
  playhead = document.createElement("progress")
  volumeSlider = document.createElement("input");
  setText(playButton, "Play");
  setText(muteButton, "volumehigh");
  setAttributes(playButton, { "type": "button", "class": "ss-icon", "id": "pause", "attribute": "autoplay" });
  setAttributes(muteButton, { "type": "button", "class": "ss-icon", "id": "mute" });
  setAttributes(volumeSlider, { "type": "range", "min": "0", "max": "1", "step": "any", "value": "1", "id": "volumeSlider" });
  var duration = audioTrack.duration;
  setAttributes(playhead, { "min": "0", "max": "100", "value": "0", "id": "playhead" });
  fader.appendChild(muteButton);
  fader.appendChild(volumeSlider);
  playback.appendChild(playButton);
  playbar.appendChild(playhead);
  audioTrack.removeAttribute("controls");
  playButton.addEventListener("click", player, false);
  muteButton.addEventListener("click", muter, false);
  volumeSlider.addEventListener("input", function(){ audioTrack.volume = volumeSlider.value; }, false);
  audioTrack.addEventListener('volumechange', volumizer, false);
  audioTrack.addEventListener('playing', function(){ playhead.max = audioTrack.duration; }, false);
  audioTrack.addEventListener('timeupdate', updatePlayhead, false);
  audioTrack.addEventListener('ended', finish, false);
});
