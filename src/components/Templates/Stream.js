import React, { useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { StaticQuery, graphql } from 'gatsby';
import SpotifyPlayer from '../Containers/SpotifyPlayer';
import Video from '../Containers/Video';
import img from '../../images/AMS_0618.jpg';

const Container = styled.div`
  width: 100vw;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(
      to bottom,
      ${props => props.theme.blue}33,
      ${props => props.theme.blue}11
    ),
    url(${props => props.bg});
  background-size: cover;
  background-repeat: no-repeat;
  .wrapper {
    padding: 2rem;
    width: 80%;
    box-sizing: border-box;
    min-height: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 1rem;
    background-image: linear-gradient(
        to bottom,
        ${props => props.theme.black}ee,
        ${props => props.theme.black}99
      ),
      url(${props => props.bg});
    background-size: cover;
    background-repeat: no-repeat;
    .buttons {
      background: transparent;
    }

    .streams {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 3rem;
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
        font-size: 3rem;
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
          display: ${props => (props.loadingSpotify ? 'flex' : 'none')};
          flex-direction: row;
          height: ${props => props.height};
          width: 100%;
          align-items: center;
          justify-content: center;
        }

        .hollow-dots-spinner .dot {
          width: 50px;
          height: 50px;
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
          display: ${props => (props.loadingSpotify ? 'none' : 'auto')};
        }
      }
    }
  }
  @media only screen and (max-width: 769px) {
    min-height: 90vh;
    .wrapper {
      margin-top: 1rem;
      background: transparent;
      width: 100%;

      .streams {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .spotifyContainer h2,
        .youtube h2 {
          font-size: 2rem;
        }
      }
    }
  }
  @media only screen and (max-width: 420px) {
    background-image: linear-gradient(
      to bottom,
      ${props => props.theme.black}cc,
      ${props => props.theme.black}ff
    );
    background-size: cover;
    background-repeat: no-repeat;
  }
`;

const Stream = props => {
  const [loadingVideo, setLoadingVideo] = useState(true);
  const [loadingSpotify, setLoadingSpotify] = useState(true);

  const mainFade = useSpring({
    from: {
      opacity: 0,
    },

    opacity: 1,
  });

  let height = window.innerHeight;

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
          size: { width: '100%', height: height / 2 },
          view: 'list',
        };

        return (
          <animated.div style={mainFade}>
            <Container
              theme={props.theme}
              bg={img}
              loadingVideo={loadingVideo}
              loadingSpotify={loadingSpotify}
              height={height}
            >
              <div className="wrapper">
                <div className="streams">
                  <animated.div style={mainFade}>
                    <div className="youtube">
                      <div className="hollow-dots-spinner">
                        <div className="dot" />
                        <div className="dot" />
                        <div className="dot" />
                      </div>
                      <Video
                        theme={props.theme}
                        onLoad={setLoadingVideo}
                        size={player.size}
                      />
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
                        onLoad={setLoadingSpotify}
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
