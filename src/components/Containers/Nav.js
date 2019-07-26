import React from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import { animated, useTrail, useSpring } from 'react-spring';

const Container = styled.div`
  max-width: 100vw;
  height: 10vh;
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(
    to right,
    ${props => props.theme.black},
    ${props => props.theme.black}cc
  );
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
        border: 2px solid ${props => props.theme.white};
        border-radius: 0.5rem;
        color: ${props => props.theme.black};
        background-color: ${props => props.theme.white}55;
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
    from: { opacity: 0, transform: 'translate3d(100px,-20px,0)' },
  });

  const slideRight = useSpring({
    from: {
      transform: 'translate3d(-50%, 0, 0) scale(0.7)',
      opacity: 0,
    },

    to: { transform: 'translate3d(0,0,0) scale(1)', opacity: 1 },
  });

  return (
    <StaticQuery
      query={graphql`
        query NavQuery {
          contentfulLanding {
            logo {
              fluid {
                base64
                src
                srcSet
                srcWebp
                srcSetWebp
                sizes
              }
            }
          }
        }
      `}
      render={data => {
        return (
          <Container theme={props.theme}>
            <animated.h1 style={slideRight} onClick={() => props.changePage(0)}>
              F E E N Y{' '}
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
      }}
    />
  );
};

export default Nav;
