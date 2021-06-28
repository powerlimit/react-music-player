import React from 'react';
import Song from '../types/Song';

const useUpdateLibrary = () => {
  const updateLibrary = (
    song: Song,
    songs: Song[],
    setSongs: React.Dispatch<React.SetStateAction<Song[]>>,
  ) => {
    const newSongs = songs.map(s => {
      return {...s, active: s.id === song.id}
    })
    setSongs(newSongs)
  }
  return {
    updateLibrary
  }
}

export default useUpdateLibrary
