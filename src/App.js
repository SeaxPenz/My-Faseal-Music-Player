import { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [currentMusicDetails, setCurrentMusicDetails] = useState({
    songName: 'Give Me Chance - (CeeNaija.com).mp3',
    songArtist: 'Bidemi Olaoba ft. Mercy Chinwo',
    songSrc: 'public/Assets/songs/Bidemi-Olaoba-feat-Mercy-Chinwo-Give-Me-Chance-(CeeNaija.com).mp3',
    songAvatar: 'public/Assets/images/Bidemi Olaoba ft. Mercy Chinwo - Give Me Chance 2.webp',
  });

  // UseState for Audio Progress
  const [audioProgress, setAudioProgress] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [avatarClassIndex, setAvatarClassIndex] = useState(0);
  const [musicIndex, setMusicIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [totalLength, setTotalLength] = useState('00:00');
  const [videoIndex, setVideoIndex] = useState(0);

  const currentAudio = useRef();

  const avatarClass = ['objectFitCover', 'objectFitContainer', 'none'];

  const handleMusicProgress = (e) => {
    setAudioProgress(e.target.value);
    currentAudio.current.currentTime = e.target.value * currentAudio.current.duration / 100;
  };

  const handleAvatar = () => {
    const songAvatar = document.getElementById('songAvatar');
    songAvatar.classList.toggle('rotateAvatar');
  };

  // Play Audio Function
  const handleAudioPlay = () => {
    if (currentAudio.current.paused) {
      currentAudio.current.play();
      setIsAudioPlaying(true);
    } else {
      currentAudio.current.pause();
      setIsAudioPlaying(false);
    }
  };

  const musicAPI = [
    {
      songName: 'Give Me Chance - (CeeNaija.com).mp3',
      songArtist: 'Bidemi Olaoba ft. Mercy Chinwo',
      songSrc: 'public/Assets/songs/Bidemi-Olaoba-feat-Mercy-Chinwo-Give-Me-Chance-(CeeNaija.com).mp3',
      songAvatar: 'public/Assets/images/Bidemi Olaoba ft. Mercy Chinwo - Give Me Chance 2.webp'
    },
    {
      songName: 'City Of God',
      songArtist: 'Dunsin Oyekan',
      songSrc: 'public/Assets/songs/City-Of-God-Dunsin-Oyekan (1).mp3',
      songAvatar: 'public/Assets/images/Dunsin Oyekan - City of God 2.jpg'
    },
    {
      songName: 'Ebenezer (Live)',
      songArtist: 'Nathaniel Bassey ft Victoria Orenze',
      songSrc: 'public/Assets/songs/Nathaniel-Bassey-Ft-Victoria-Orenze-Ebenezer-Live-(TrendyBeatz.com).mp3',
      songAvatar: 'public/Assets/images/Ebenezer.jpg.jpg'
    }
  ];

  const updateCurrentMusicDetails = (number) => {
    let musicObject = musicAPI[number];
    setCurrentMusicDetails({
      songName: musicObject.songName,
      songArtist: musicObject.songArtist,
      songSrc: musicObject.songSrc,
      songAvatar: musicObject.songAvatar,
    });
    currentAudio.current.src = musicObject.songSrc;
    currentAudio.current.load();
    // Ensure the new source is loaded
    currentAudio.current.addEventListener('canplay', () => {
      currentAudio.current.play();
      setIsAudioPlaying(true);
    }, { once: true }); 

  };

  // Previous Song Function
  const handlePrevSong = () => {
    if (musicIndex <= 0) {
      setMusicIndex(musicAPI.length - 1);
      updateCurrentMusicDetails(musicAPI.length - 1);
    } else {
      setMusicIndex(musicIndex - 1);
      updateCurrentMusicDetails(musicIndex - 1);
    }
  };

  const handleNextSong = () => {
    if (musicIndex >= musicAPI.length - 1) {
      setMusicIndex(0);
      updateCurrentMusicDetails(0);
    } else {
      setMusicIndex(musicIndex + 1);
      updateCurrentMusicDetails(musicIndex + 1);
    }
  };

  const handleAudioUpdate = () => {
    // Update current time
    let currentMinutes = Math.floor(currentAudio.current.currentTime / 60);
    let currentSeconds = Math.floor(currentAudio.current.currentTime - currentMinutes * 60);
    let formattedCurrentTime = `${currentMinutes < 10 ? '0' + currentMinutes : currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}`;
    setCurrentTime(formattedCurrentTime);

    // Update total length
    let totalMinutes = Math.floor(currentAudio.current.duration / 60);
    let totalSeconds = Math.floor(currentAudio.current.duration - totalMinutes * 60);
    let formattedTotalLength = `${totalMinutes < 10 ? '0' + totalMinutes : totalMinutes}:${totalSeconds < 10 ? '0' + totalSeconds : totalSeconds}`;
    setTotalLength(formattedTotalLength);

    // Update audio progress
    const progress = (currentAudio.current.currentTime / currentAudio.current.duration) * 100;
    setAudioProgress(progress);
  };

  useEffect(() => {
    // Set initial total length when the component mounts
    if (currentAudio.current) {
      currentAudio.current.addEventListener('loadedmetadata', handleAudioUpdate);
    }
  }, []);

  const vidArray = ['/Assets/videos/video1.mp4',
    '/Assets/videos/video2.mp4',
    '/Assets/videos/video3.mp4',
    '/Assets/videos/video4.mp4',
    '/Assets/videos/video5.mp4',
    '/Assets/videos/video3.mp4',
    '/Assets/videos/video7.mp4']; 

  const handleChangeBackground = () => {
    if (videoIndex >= vidArray.length - 1) {
      setVideoIndex(0);
    } else {
      setVideoIndex(videoIndex + 1);
    }
  }

  return (
    <div className="container">
      <audio src={currentMusicDetails.songSrc}
        ref={currentAudio} onEnded={handleNextSong}
        onTimeUpdate={handleAudioUpdate}></audio>
      <video src={vidArray[videoIndex]}
        autoPlay muted loop 
        className="backgroundVideo"></video>
      <div className="blackScreen"></div>
      <div className="music-Container">
        <p className="musicPlayer">Faseal Music Player</p>
        <p className="music-Head-Name">{currentMusicDetails.songName}</p>
        <p className="music-Artist-Name">{currentMusicDetails.songArtist}</p>
        <img
          src={currentMusicDetails.songAvatar}
          className={avatarClass[avatarClassIndex]}
          onClick={handleAvatar}
          alt="Song Avatar"
          id="songAvatar"
        />
        <div className="musicTimerDiv">
          <p className="musicCurrentTime">{currentTime}</p>
          <p className="musicTotalLength">{totalLength}</p>
        </div>
        <input
          type="range"
          name="musicProgressBar"
          className="musicProgressBar"
          value={audioProgress}
          onChange={handleMusicProgress}
        />
        <div className="musicControllers">
          <i className="fa-solid fa-backward musicController" onClick={handlePrevSong}></i>
          <i
            className={`fa-solid ${isAudioPlaying ? 'fa-pause-circle' : 'fa-circle-play'} playBtn`}
            onClick={handleAudioPlay}
          ></i>
          <i className="fa-solid fa-forward musicController" onClick={handleNextSong}></i>
        </div>
        <div className="changeBackBtn" onClick={handleChangeBackground}>
          Change Background
        </div>
      </div>
    </div>
  );
}

export default App;
