import React, {useEffect, useRef, useState} from 'react';
import Player from './components/Player/Player'
import Song from './components/Song/Song'
import {getMusic} from "./utils";
import ISong from "./types/Song";
import Library from "./components/Library/Library";
import Nav from "./components/Nav/Nav";

export interface ISongInfo {
    currentTime: number;
    duration: number;
}

function App() {

    const [songs, setSongs] = useState<Array<ISong>>(getMusic())
    const [currentSong, setCurrentSong] = useState<ISong>(songs[0])
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const audio = useRef<HTMLAudioElement>(null)
    const [songInfo, setSongInfo] = useState<ISongInfo>({
        currentTime: 0,
        duration: 0,
    })
    const [isLibraryOpen, setIsLibraryOpen] = useState(false);


    const handleUpdateTime = (e: React.ChangeEvent<HTMLAudioElement>) => {
        const {duration, currentTime} = e.target
        if (!isNaN(duration)) {
            setSongInfo({
                ...songInfo,
                currentTime,
                duration,
            })
        }
    }

    useEffect(() => {
        document.addEventListener('click', () => {
            
        })
    }, [])

    return (
        <div className="App">
            <Nav
                isLibraryOpen={isLibraryOpen}
                setIsLibraryOpen={setIsLibraryOpen}
            />
            <Song song={currentSong}/>
            <Player
                audio={audio}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                song={currentSong}
                setSongInfo={setSongInfo}
                songInfo={songInfo}
            />
            <Library
                setCurrentSong={setCurrentSong}
                songs={songs}
                audio={audio}
                isPlaying={isPlaying}
                setSongs={setSongs}
                isLibraryOpen={isLibraryOpen}
            />

            <audio
                onTimeUpdate={handleUpdateTime}
                ref={audio}
                src={currentSong.audio}
                onLoadedMetadata={handleUpdateTime}
            />
        </div>
    );
}

export default App;
