import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMusic} from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components";

const Wrapper = styled.nav`
  min-height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 50%;
  margin-left: auto;
  margin-right: auto;
  
  button {
    background: transparent;
    border: 2px solid rgb(65, 65, 65);
    padding: .5rem;
    transition: all .3s ease;
    cursor: pointer;
    &:hover {
      background: rgb(65, 65, 65);
      color: #fff;
    }
  }
`;

interface IProps {
    isLibraryOpen: boolean;
    setIsLibraryOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Nav: React.FC<IProps> = ({isLibraryOpen, setIsLibraryOpen}) => {
    return (
        <Wrapper>
            <h1>Waves</h1>
            <button
                onClick={() => setIsLibraryOpen(!isLibraryOpen)}
            >
                Library <FontAwesomeIcon icon={faMusic} />
            </button>
        </Wrapper>
    )
}

export default Nav
