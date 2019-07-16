import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useSpring, animated, useTrail, useTransition } from 'react-spring';
import { StaticQuery, graphql } from 'gatsby';
import Bio from '../Containers/Bio';

const Container = styled.div`
  background-image: linear-gradient(
      to bottom,
      ${props => props.theme.blue}44,
      ${props => props.theme.blue}22
    ),
    url(${props => props.bg});
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 90vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2em;
  align-content: space-around;
  justify-content: space-between;
  .wrapper2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    img {
      background-image: linear-gradient(
        to bottom,
        ${props => props.theme.black}cc,
        ${props => props.theme.black}ee,
        ${props => props.theme.black}99
      );
      border-radius: 1em;
      box-sizing: border-box;
      max-height: 80vh;
      max-width: 90%;
      padding: 2em;
      position: absolute;
    }
    .wrapper {
      padding: 2em;
      width: 90%;
      box-sizing: border-box;
      min-height: 60vh;
      background-image: linear-gradient(
          to bottom,
          ${props => props.theme.black}cc,
          ${props => props.theme.black}ee,
          ${props => props.theme.black}99
        ),
        url(${props => props.bg});
      background-size: cover;
      background-repeat: no-repeat;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 1em;
      .buttons {
        min-height: 20%;
        box-sizing: border-box;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        justify-content: center;
        align-items: center;
        button {
          text-align: center;
          box-sizing: border-box;
          width: 100%;
          font-size: 1em;
          color: ${props => props.theme.white};
          padding: 0.5em;
          cursor: pointer;
          background-color: transparent;
          border: none;
          :hover {
            color: ${props => props.theme.blue};
            box-sizing: border-box;
          }
        }
        .selected {
          color: ${props => props.theme.blue};
        }
      }
      .about {
        margin-top: 1em;
        min-height: 90%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
`;

const About = props => {
  const mainFade = useSpring({
    from: {
      opacity: 0,
    },

    opacity: 1,
  });
  const [imgIndex, set] = useState(0);
  const onClick = useCallback(() => set(state => (state + 1) % 3), []);
  const transitions = useTransition(imgIndex, p => p, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(50%,0,0)' },
  });
  const [currentBio, setCurrentBio] = useState(0);

  const buttons = [
    { text: 'The Band' },
    { text: 'Matthew Koerner' },
    { text: 'Jordan Miller' },
    { text: 'Joe MacPhee' },
    { text: 'Matt Mahler' },
  ];
  const trail = useTrail(buttons.length, {
    opacity: 1,
    transform: 'translate3d(0,0,0)',
    from: { opacity: 0, transform: 'translate3d(100px,-20px,0)' },
  });
  return (
    <StaticQuery
      query={graphql`
        query AboutQuery {
          contentfulAbout {
            title
            backgroundImage {
              file {
                url
              }
            }
            bios {
              name
              bio {
                childMarkdownRemark {
                  html
                }
              }
              rig {
                childMarkdownRemark {
                  html
                }
              }
              socialLinks
              position
              images {
                id
                file {
                  url
                }
              }
            }
          }
        }
      `}
      render={data => {
        console.log(data);
        return (
          <animated.div style={mainFade}>
            <Container
              theme={props.theme}
              bg={data.contentfulAbout.backgroundImage.file.url}
            >
              <div className="wrapper2">
                <div className="wrapper">
                  <div className="buttons">
                    {trail.map((animation, index) => {
                      return (
                        <animated.div style={animation} key={index}>
                          <button
                            onClick={() => setCurrentBio(index)}
                            className={currentBio === index ? 'selected' : null}
                          >
                            {buttons[index].text}
                          </button>
                        </animated.div>
                      );
                    })}
                  </div>
                  <animated.div className="about" style={mainFade}>
                    <Bio
                      theme={props.theme}
                      data={data.contentfulAbout.bios[currentBio]}
                    />
                  </animated.div>
                </div>
              </div>
              <div className="wrapper2">
                {transitions.map(({ item, props: animation, key }) => {
                  return (
                    <animated.img
                      src={
                        data.contentfulAbout.bios[currentBio].images[item].file
                          .url
                      }
                      alt=""
                      key={key}
                      style={animation}
                      onClick={onClick}
                    />
                  );
                })}
              </div>
            </Container>
          </animated.div>
        );
      }}
    />
  );
};

export default About;
