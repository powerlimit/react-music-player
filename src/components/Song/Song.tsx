import React from "react";
import styled from "styled-components";
import ISong from '../../types/Song'

const Container = styled.div`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  img {
    width: 200px;
    -webkit-border-radius: 50%;-moz-border-radius: 50%;border-radius: 50%;
  }
  h2 {
    padding: 3rem 1rem 1rem;
  }
  h3 {
    font-size: 1rem;
  }
`

interface IProps {
    song: ISong;
}

const Song:React.FC<IProps> = ({song}) => {
    return (
        <Container>
            <img src={song.cover} alt=""/>
            <h2>{song.name}</h2>
            <h3>{song.artist}</h3>
        </Container>
    )
}

export default Song;
