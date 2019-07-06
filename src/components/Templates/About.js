import React, { useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { StaticQuery, graphql } from 'gatsby';
import SpotifyPlayer from '../Containers/SpotifyPlayer';
import Nav from '../Containers/Nav';

const Container = styled.div`
  background-image: linear-gradient(
      to bottom,
      ${props => props.theme.blue}44,
      ${props => props.theme.blue}22
    ),
    url(${props => props.bg});
  background-size: cover;
  background-repeat: no-repeat;
  width: 100vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .wrapper {
    padding: 2em;
    width: 60%;
    box-sizing: border-box;
    height: 60%;
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
      background: transparent;
    }
    .headerWrapper {
      display: grid;
      grid-template-rows: 2fr 1fr 2fr;
      align-items: center;
      justify-content: center;

      h1 {
        place-self: center;
        width: 30%;
        text-align: center;
        box-sizing: border-box;
        font-size: 6em;
        font-family: 'miller';
        font-style: italic;
        border-bottom: 3px solid ${props => props.theme.blue};
        color: ${props => props.theme.white};
        text-shadow: 0px 4px 3px ${props => props.theme.blue},
          0px 8px 13px ${props => props.theme.black}99,
          0px 18px 23px ${props => props.theme.black}77;
      }
      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        p {
          text-align: center;
          font-size: 1em;
          width: 80%;
          font-family: 'miller';
          color: ${props => props.theme.white};
        }
      }

      .spotifyContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        width: 100%;
        .hollow-dots-spinner,
        .hollow-dots-spinner * {
          box-sizing: border-box;
        }

        .hollow-dots-spinner {
          background-color: ${props => props.theme.black};
          display: ${props => (props.loading ? 'grid' : 'none')};
          grid-template-columns: 1fr 1fr 1fr;
          height: 80px;
          width: calc(30px * 3);
          align-items: center;
          justify-content: center;
          width: 60%;
        }

        .hollow-dots-spinner .dot {
          width: 15px;
          height: 15px;
          margin: 0 calc(15px / 2);
          border: calc(15px / 5) solid ${props => props.theme.blue};
          border-radius: 50%;
          float: left;
          transform: scale(0);
          animation: hollow-dots-spinner-animation 1000ms ease infinite 0ms;
        }

        .hollow-dots-spinner .dot:nth-child(1) {
          animation-delay: calc(300ms * 1);
        }

        .hollow-dots-spinner .dot:nth-child(2) {
          animation-delay: calc(300ms * 2);
        }

        .hollow-dots-spinner .dot:nth-child(3) {
          animation-delay: calc(300ms * 3);
        }

        @keyframes hollow-dots-spinner-animation {
          50% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
        .SpotifyPlayer {
          display: ${props => (props.loading ? 'none' : 'auto')};
          width: 60%;
        }
      }
    }
  }
`;

const About = props => {
  const [loading, setLoading] = useState(true);

  const mainFade = useSpring({
    from: {
      opacity: 0,
    },

    opacity: 1,
  });
  const slideDown = useSpring({
    from: {
      transform: 'translate3d(0, -50%, 0) scale(0.7)',
      opacity: 0,
    },

    to: { transform: 'translate3d(0,0,0) scale(1)', opacity: 1 },
  });
  const slideRight = useSpring({
    from: {
      transform: 'translate3d(50%, 0, 0) scale(0.7)',
      opacity: 0,
    },

    to: { transform: 'translate3d(0,0,0) scale(1)', opacity: 1 },
  });

  return (
    <StaticQuery
      query={graphql`
        query AboutQuery {
          contentfulAbout {
            title
            bio {
              childMarkdownRemark {
                html
              }
            }
            songUrl
            backgroundImage {
              file {
                url
              }
            }
          }
        }
      `}
      render={data => {
        const player = {
          uri: data.contentfulAbout.songUrl,
          size: { width: '100%', height: '80px' },
          view: 'coverart',
          theme: 'black',
        };

        return (
          <animated.div style={mainFade}>
            <Nav changePage={props.changePage} theme={props.theme} />
            <Container
              theme={props.theme}
              bg={data.contentfulAbout.backgroundImage.file.url}
              loading={loading}
            >
              <div className="wrapper">
                <div className="headerWrapper">
                  <animated.h1 style={slideDown}>
                    {data.contentfulAbout.title}
                  </animated.h1>
                  <animated.div
                    className="subTitle"
                    style={slideRight}
                    dangerouslySetInnerHTML={{
                      __html: data.contentfulAbout.bio.childMarkdownRemark.html,
                    }}
                  />

                  <div className="spotifyContainer">
                    <div className="hollow-dots-spinner">
                      <div className="dot" />
                      <div className="dot" />
                      <div className="dot" />
                    </div>

                    <animated.div
                      style={mainFade}
                      className="spotifyAnimationContainer"
                    >
                      <SpotifyPlayer
                        uri={player.uri}
                        size={player.size}
                        view={player.view}
                        theme={player.theme}
                        onLoad={setLoading}
                      />
                    </animated.div>
                  </div>
                </div>
              </div>
            </Container>
          </animated.div>
        );
      }}
    />
  );
};

export default About;
