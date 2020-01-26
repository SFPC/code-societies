function oralHistory(audioPlayerId, audioId, playAudioId, percentageId, scrubberId, currentTimeId, loading) {
  const media = id(audioId);
  const audioPlayer = id(audioPlayerId);
  const playAudio = id(playAudioId);
  const percentage = id(percentageId);
  const scrubber = id(scrubberId);
  const currentTime = id(currentTimeId);
  const loading = id(loading)
  let hash;
  const activeUrl = window.location.hash;
  hash = activeUrl.replace('#', '');
  let activeAudio;

  if (hash) {
    activeAudio = id(`audio-player-${hash}`);
    activeAudio.classList.add('active');
    activeAudio.scrollIntoView();
  }

  function togglePlay() {
    if (window.location.hash === '') {
      console.log(audioPlayer);
      // activeAudio.classList.toggle('active');
    }

    if (media.paused === false) {
      media.pause();
      playAudio.classList.remove('pause');
      console.log('a');
      window.location.hash = '';
      audioPlayer.scrollIntoView();
      // audioPlayer.classList.toggle('active');
      audioPlayer.classList.remove('active');
      audioPlayer.classList.remove('is-playing');
    } else {
      media.play();

      audioPlayer.classList.add('active');
      audioPlayer.classList.add('is-playing');
      playAudio.classList.add('pause');
    }
  }

  function id(name) {
    return document.getElementById(name);
  };

  function percentagePlayer() {
    let percent = (media.currentTime / media.duration).toFixed(2) * 100;
    percentage.style.width = `${percent}%`;
  }

  function whatIsCurrentTime(currTime) {
    const currentMinute = parseInt(currTime / 60) % 60;
    const currentSecondsLong = currTime % 60;
    const currentSeconds = currentSecondsLong.toFixed();
    const currentTimeFormatted = `${currentMinute < 10 ? `0${currentMinute}` : currentMinute}:${
    currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds
    }`;

    return currentTimeFormatted;
  }

  function startProgressBar() {
    const currTime = whatIsCurrentTime(media.currentTime);
    currentTime.innerHTML = currTime;
    scrubber.addEventListener('click', seek);
    console.log(media.currentTime);
    if (media.currentTime > 0) {
      loading.style.opacity = '0';
    }
    media.onended = () => {
      playAudio.classList.remove('pause');
      percentage.style.width = 0;
      currentTime.innerHTML = '00:00';
    };

    function seek(e) {
      const percent = e.offsetX / this.offsetWidth;
      media.currentTime = percent * media.duration;
    }

    percentagePlayer();
  }

  playAudio.addEventListener('click', togglePlay)
  media.addEventListener('timeupdate', startProgressBar);
}
