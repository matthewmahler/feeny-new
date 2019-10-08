import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { StaticQuery, graphql } from 'gatsby';
import SpotifyPlayer from '../Containers/SpotifyPlayer';
import Video from '../Containers/Video';
import img from '../../images/AMS_0618.jpg';
import { useWindowSize } from '../Hooks/useWindowSize';

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

    .buttons {
      background: transparent;
    }

    .streams {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .spotifyContainer,
      .youtube {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .spotifyContainer {
        margin-bottom: 2rem;
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
  const mainFade = useSpring({
    from: {
      opacity: 0,
    },

    opacity: 1,
  });

  let [width, height] = useWindowSize();

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
        const spotifyPlayer = {
          uri: data.contentfulAbout.songUrl,
          size: {
            width: width > height ? height * (2 / 3) : '100%',
            height: '200px',
          },
          view: 'list',
        };
        const youtubePlayer = {
          size: {
            width: width > height ? height * (2 / 3) : '100%',
            height: height / 2,
          },
        };

        return (
          <animated.div style={mainFade}>
            <Container theme={props.theme} bg={img}>
              <div className="wrapper">
                <div className="streams">
                  <div className="spotifyContainer">
                    <SpotifyPlayer
                      uri={spotifyPlayer.uri}
                      size={spotifyPlayer.size}
                      view={spotifyPlayer.view}
                      theme={spotifyPlayer.theme}
                    />
                  </div>

                  <div className="youtube">
                    <Video theme={props.theme} size={youtubePlayer.size} />
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
