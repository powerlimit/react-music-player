import React from "react";
import styled from "styled-components";
import ISong from '../../types/Song'
import Song from "../../types/Song";

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  cursor: pointer;
  transition: .3s;

  &:hover {
    background: #b1b1e7;
  }

  img {
    width: 70px;
    flex-shrink: 0;
    margin-right: 15px;
  }

  h3 {
    font-size: 1rem;
  }

  h4 {
    font-size: .8rem;
    font-weight: 400;
  }
`

interface IProps {
    song: ISong;
    songs: ISong[];
    setCurrentSong: React.Dispatch<React.SetStateAction<Song>>,
    setSongs: React.Dispatch<React.SetStateAction<Song[]>>,
    audio: React.RefObject<HTMLAudioElement>,
    isPlaying: boolean
}

const LibrarySong:React.FC<IProps> = ({setSongs, songs, isPlaying, song, setCurrentSong, audio}) => {

    const handleSelectSong = () => {
        setCurrentSong(song)
        const newSongs = songs.map(s => {
            return {...s, active: s.id === song.id}
        })
        setSongs(newSongs)
        if (isPlaying) {
            audio.current!.play().then(a => {
                audio.current!.play()
            })
        }
    }

    const style = song.active ? {
        background: `linear-gradient(to left, ${song.color[0]}, ${song.color[1]})`
    } : {}

    return (
        <Container style={style} onClick={handleSelectSong}>
            <img src={song.cover} alt=""/>
            <div>
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </Container>
    )
}

export default LibrarySong;
