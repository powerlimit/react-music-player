import React from "react";
import styled from "styled-components";
import LibrarySong from "../LibrarySong/LibrarySong";
import Song from "../../types/Song";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 20rem;
  box-shadow: 2px 2px 50px rgb(204, 204, 204, .5);
  background: #ffffff;
  overflow: auto;
  padding: 1rem 0;
  transition: all .3s ease;
  transform: translateX(-100%);
  opacity: 0;
  &.opened {
    transform: none;
    opacity: 1;
  }
  h2 {
    padding: 0 1rem 1rem 2rem;
  }
`

interface IProps {
    songs: Song[],
    setCurrentSong: React.Dispatch<React.SetStateAction<Song>>,
    setSongs: React.Dispatch<React.SetStateAction<Song[]>>,
    audio: React.RefObject<HTMLAudioElement>
    isPlaying: boolean;
    isLibraryOpen: boolean;
}

const Library: React.FC<IProps> = ({
                                       setSongs,
                                       isPlaying,
                                       songs,
                                       setCurrentSong,
                                       audio,
                                       isLibraryOpen

}) => {
    const openedClass = isLibraryOpen ? 'opened' : '';
    return (
        <Wrapper className={openedClass}>
            <h2>Library</h2>
            <ul>
                {songs.map(s => (<li key={s.id}>
                    <LibrarySong
                        setCurrentSong={setCurrentSong}
                        song={s}
                        songs={songs}
                        audio={audio}
                        isPlaying={isPlaying}
                        setSongs={setSongs}
                    />
                </li>))}
            </ul>
        </Wrapper>
    )
}

export default Library
