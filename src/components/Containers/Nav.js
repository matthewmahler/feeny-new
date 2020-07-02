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
  background-color: ${(props) => props.theme.black};
  position: sticky;
  z-index: 100;
  box-sizing: border-box;
  h1 {
    width: auto;
    font-family: 'miller';
    font-style: italic;
    font-size: 4rem;
    font-weight: 300;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    color: ${(props) => props.theme.white};
    box-sizing: border-box;
    margin: 0;
    margin-left: 3rem;
    height: 100%;
    letter-spacing: 5px;
    span {
      cursor: pointer;
    }
  }
  .buttons {
    margin-right: 2rem;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-around;
    div button {
      box-sizing: border-box;
      width: 90%;
      font-size: 1.5rem;
      color: ${(props) => props.theme.white};
      padding: 0;
      cursor: pointer;
      background-color: transparent;
      border: none;
      :hover {
        color: ${(props) => props.theme.blue};
      }
    }
  }

  @media only screen and (max-width: 420px) {
    display: flex;
    flex-direction: column;
    h1 {
      margin: 0;
      font-size: 2.5rem;
    }
    .buttons {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-right: 0;
      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        button {
          margin: 0 1rem;
          text-align: center;
          font-size: 1.2rem;
          padding-bottom: 0.5rem;
        }
      }
    }
  }
`;

const Nav = (props) => {
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
      <animated.h1 style={slideRight}>
        <span onClick={() => props.changePage(0)}>F E E N Y</span>
      </animated.h1>

      <div className="buttons">
        {trail.map((animation, index) => {
          return (
            <animated.div style={animation} key={index}>
              <button
                id={buttons[index].text}
                onClick={() => props.changePage(index)}
              >
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
