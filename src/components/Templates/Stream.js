import React, { useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { StaticQuery, graphql } from 'gatsby';
import SpotifyPlayer from '../Containers/SpotifyPlayer';
import Video from '../Containers/Video';
import img from '../../images/AMS_0618.jpg';

import Nav from '../Containers/Nav';

const Container = styled.div`
  background-image: linear-gradient(
      to bottom,
      ${props => props.theme.blue}33,
      ${props => props.theme.blue}11
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
    min-height: 60%;
    background-image: linear-gradient(
        to bottom,
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

    .streams {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 3em;
      align-items: center;
      justify-content: center;

      .spotifyContainer,
      .youtube {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .spotifyContainer h2,
      .youtube h2 {
        font-size: 2em;
        span {
          color: ${props => props.theme.white};
          border-bottom: 3px solid ${props => props.theme.blue};
          text-align: center;
        }
      }

      .spotifyContainer {
        width: 100%;
        .hollow-dots-spinner,
        .hollow-dots-spinner * {
          box-sizing: border-box;
        }

        .hollow-dots-spinner {
          background-color: ${props => props.theme.black};
          display: ${props => (props.loading ? 'flex' : 'none')};
          flex-direction: row;
          height: 400px;
          width: 100%;
          align-items: center;
          justify-content: center;
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
        }
      }
    }
  }
`;

const Stream = props => {
  const [loading, setLoading] = useState(true);

  const mainFade = useSpring({
    from: {
      opacity: 0,
    },

    opacity: 1,
  });

  return (
    <StaticQuery
      query={graphql`
        query StreamQuery {
          contentfulAbout {
            songUrl
          }
        }
      `}
      render={data => {
        const player = {
          uri: data.contentfulAbout.songUrl,
          size: { width: '100%', height: '400px' },
          view: 'list',
        };

        return (
          <animated.div style={mainFade}>
            <Nav changePage={props.changePage} theme={props.theme} />
            <Container theme={props.theme} bg={img} loading={loading}>
              <div className="wrapper">
                <div className="streams">
                  <animated.div style={mainFade}>
                    <div className="youtube">
                      <div className="hollow-dots-spinner">
                        <div className="dot" />
                        <div className="dot" />
                        <div className="dot" />
                      </div>
                      <Video theme={props.theme} onLoad={setLoading} />
                    </div>
                  </animated.div>
                  <div className="spotifyContainer">
                    <h2>
                      <span>Latest Release</span>
                    </h2>
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

export default Stream;
