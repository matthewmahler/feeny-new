import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 20%;
  box-sizing: border-box;
  width: 40%;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  button {
    text-align: center;
    box-sizing: border-box;
    width: 100%;
    font-size: 1.2rem;
    color: ${props => props.theme.white};
    padding: 1rem;
    cursor: pointer;
    background-color: transparent;
    border: 1px solid ${props => props.theme.white};
    :hover {
      color: ${props => props.theme.blue};
      border: 1px solid ${props => props.theme.blue};
      box-sizing: border-box;
    }
  }
  .selected {
    color: ${props => props.theme.blue};
    border-bottom: 1px solid ${props => props.theme.blue};
  }
  @media only screen and (max-width: 420px) {
    button {
      font-size: 0.7rem;
    }
  }
`;

const ButtonContainer = props => {
  onclick = i => {
    if (i === 0) {
      props.switchPanel(true);
    }
    if (i === 1) {
      props.switchPanel(false);
    }
  };
  return (
    <Container theme={props.theme}>
      {props.buttons.map((button, i) => {
        return (
          <button
            className={props.showPanel ? 'selected' : null}
            onClick={() => onclick(i)}
          >
            {button.text}
          </button>
        );
      })}
    </Container>
  );
};

export default ButtonContainer;
