import React from 'react';
import styled from 'styled-components';
import { animated, useTrail, useSpring } from 'react-spring';

const Container = styled.nav`
  width: 100%;
  height: 10vh;
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.black};
  position: sticky;
  z-index: 100;
  h1 {
    font-family: 'miller';
    font-style: italic;
    font-size: 4rem;
    font-weight: 300;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    color: ${props => props.theme.white};
    box-sizing: border-box;
    margin: 0;
    padding-left: 3rem;
    height: 100%;
    cursor: pointer;
    letter-spacing: 5px;
  }
  .buttons {
    padding-right: 2rem;
    box-sizing: border-box;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 2rem;
    justify-content: center;
    align-items: center;
    div button {
      box-sizing: border-box;
      width: 90%;
      font-size: 1.5rem;
      color: ${props => props.theme.white};
      padding: 0.5em 0;
      cursor: pointer;
      background-color: transparent;
      border: none;
      :hover {
        color: ${props => props.theme.blue};
      }
    }
  }

  @media only screen and (max-width: 375px) {
    display: flex;
    flex-direction: column;
    h1 {
      padding: 0;
      font-size: 2.5rem;
    }
    .buttons {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding-right: 0;
      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        button {
          margin: 0 1rem;
          text-align: center;
          font-size: 1rem;
          padding-bottom: 0.5rem;
        }
      }
    }
  }
`;

const Nav = props => {
  const buttons = [
    { text: 'Home' },
    { text: 'About' },
    { text: 'Media' },
    { text: 'Stream' },
    { text: 'Tour' },
    { text: 'Merch' },
  ];

  const trail = useTrail(buttons.length, {
    opacity: 1,
    transform: 'translate3d(0,0,0)',
    from: { opacity: 0, transform: 'translate3d(100px,0,0)' },
  });

  const slideRight = useSpring({
    from: {
      transform: 'translate3d(-50%, 0, 0) scale(0.7)',
      opacity: 0,
    },

    to: { transform: 'translate3d(0,0,0) scale(1)', opacity: 1 },
  });

  return (
    <Container theme={props.theme} id="page-wrap">
      <animated.h1 style={slideRight} onClick={() => props.changePage(0)}>
        F E E N Y
      </animated.h1>

      <div className="buttons">
        {trail.map((animation, index) => {
          return (
            <animated.div style={animation} key={index}>
              <button onClick={() => props.changePage(index)}>
                {buttons[index].text}
              </button>
            </animated.div>
          );
        })}
      </div>
    </Container>
  );
};

export default Nav;
