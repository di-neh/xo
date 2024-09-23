import React from 'react';
import styled from "styled-components";

const Button = styled.button`
    font-size: 5vh;
    width: 12vh;
    height: 12vh;
    margin: 2vh;
    background: #282c34;
    color: #61dafb;
    border-color: #61dafb;
    cursor: pointer;
    box-sizing: border-box;
`

const Square = ({value, setSquaresValue}) => {
    return (
        <Button
            onClick={setSquaresValue}
            style={{
                color: value ? '#61dafb' : '#282c34',
            }}
        >
            {value ? value : '-'}
        </Button>
    );
};

export default Square;