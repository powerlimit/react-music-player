import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faAngleLeft, faAngleRight, faPause } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import ISong from "../../types/Song";
import { ISongInfo } from "../../App";
import useUpdateLibrary from '../../hooks/useUpdateLibrary';

type Dir = 'forward' | 'backward'

const PlayerWrap = styled.div`
  min-height: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;
const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  width: 30%;

  svg {
    cursor: pointer;
  }
`;
const TimeLine = styled.div`
  display: flex;
  width: 50%;

  input {
    flex: 1;
    padding: 1rem 2rem;
  }

  p {
    padding: 1rem;
  }
`;

interface IProps {
  song: ISong;
  songs: ISong[];
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  audio: React.RefObject<HTMLAudioElement>,
  songInfo: ISongInfo,
  setSongInfo: React.Dispatch<React.SetStateAction<ISongInfo>>;
  setCurrentSong: React.Dispatch<React.SetStateAction<ISong>>;
  setSongs: React.Dispatch<React.SetStateAction<ISong[]>>;
}

const Player: React.FC<IProps> = ({
                                    song,
                                    isPlaying,
                                    setIsPlaying,
                                    audio,
                                    setSongInfo,
                                    songInfo,
                                    setCurrentSong,
                                    songs,
                                    setSongs
                                  }) => {
  const {updateLibrary} = useUpdateLibrary()

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.current!.currentTime = parseInt(e.target.value);
    setSongInfo({
      ...songInfo,
      currentTime: parseInt(e.target.value),
    });
  };

  const handleSkipSong = (direction: Dir): void => {
    const idx = songs.findIndex(s => s.id === song.id)
    let newSong;
    if (direction === 'forward') {
      newSong = songs[(idx + 1) % songs.length]
    } else {
      const backIdx = (idx - 1) % songs.length
      if (backIdx < 0) {
        newSong = songs[songs.length - 1]
      } else {
        newSong = songs[backIdx]
      }
    }
    setCurrentSong(newSong)
    updateLibrary(newSong, songs, setSongs)
    if (isPlaying) {
      audio.current!.play().then(a => {
        audio.current!.play()
      })
    }
  };

  const getTime = (time: number): string => {
    if (!time) {
      return '0 : 00';
    }
    return `${Math.floor(time / 60)} : ${('0' + Math.floor(time % 60)).slice(-2)}`;
  };

  const handlePlay = async () => {
    if (isPlaying) {
      await audio.current!.pause();
      setIsPlaying(false);
    } else {
      await audio.current!.play();
      setIsPlaying(true);
    }
  };

  return (
    <PlayerWrap>
      <TimeLine>
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          onChange={handleSeek}
          value={songInfo.currentTime}
          min={0}
          max={songInfo.duration}
          type="range"
          className="inp"
        />
        <p>{getTime(songInfo.duration)}</p>
      </TimeLine>
      <Controls>
        <FontAwesomeIcon onClick={() => handleSkipSong('backward')} size="2x" icon={faAngleLeft} />
        <FontAwesomeIcon onClick={handlePlay} size="2x" icon={isPlaying ? faPause : faPlay} />
        <FontAwesomeIcon onClick={() => handleSkipSong('forward')} size="2x" icon={faAngleRight} />
      </Controls>
    </PlayerWrap>
  );
};

export default Player;
