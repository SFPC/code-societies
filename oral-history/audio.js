function oralHistory(audioPlayerId, audioId, playAudioId, percentageId, scrubberId, currentTimeId) {
  const media = id(audioId);
  const audioPlayer = id(audioPlayerId);
  const playAudio = id(playAudioId);
  const percentage = id(percentageId);
  const scrubber = id(scrubberId);
  const currentTime = id(currentTimeId);
  let hash;
  const activeUrl = window.location.hash;
  hash = activeUrl.replace('#', '');
  let activeAudio;
  if (hash) {
    activeAudio = id(`audio-player-${hash}`);
    console.log(activeAudio);
    activeAudio.classList.add('active');
  }

  function togglePlay() {
    if (window.location.hash === '') {
      audioPlayer.classList.toggle('active');
    }
    window.location.hash = '';

    if (media.paused === false) {
      media.pause();
      playAudio.classList.remove('pause');
    } else {
      media.play();
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
