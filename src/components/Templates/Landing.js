import React from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import useScroll from '../Hooks/useScroll';

import Tour from './Tour.js';

const Container = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .full-bg {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    z-index: -100;
    video {
      position: absolute;
      top: 0;
      left: 0;
      min-width: 100%;
      min-height: 100%;
    }
  }
  .landing {
    width: 100%;
    height: 70vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h1 {
      font-family: 'miller';
      font-style: italic;
      font-size: 8em;
      font-weight: 300;
      color: ${props => props.theme.white};
      margin: 0.2em auto;
    }
    button {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      padding: 1em 1.5em;
      font-size: 1.5em;
      font-weight: 600;

      color: ${props => props.theme.blue};
      border: 5px solid ${props => props.theme.blue};
      border-radius: 1em;
      span {
        margin-right: 15px;
      }
      cursor: pointer;
    }
  }
  .bounce {
    width: 100%;
    text-align: center;
    color: ${props => props.theme.white};
    -moz-animation: bounce 2s infinite;
    -webkit-animation: bounce 2s infinite;
    animation: bounce 2s infinite;
  }
  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-30px);
    }
    60% {
      transform: translateY(-15px);
    }
  }
`;

const Landing = props => {
  const [executeScroll, scrollHtmlAttributes] = useScroll();
  return (
    <StaticQuery
      query={graphql`
        query LandingQuery {
          contentfulLanding {
            title
            backgroundVideo {
              file {
                url
              }
            }
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
          <>
            <Container theme={props.theme}>
              <div className="full-bg">
                <video autoPlay muted loop>
                  <source
                    src={data.contentfulLanding.backgroundVideo.file.url}
                    type="video/mp4"
                  />
                </video>
              </div>
              <div className="landing">
                <h1>Are You Leaving?</h1>
                <button
                  onClick={() =>
                    window.open(
                      'https://open.spotify.com/artist/4TWQJppHQYlY4FlzuvEDUc',
                      '_blank'
                    )
                  }
                >
                  <span> Listen Now On Spotify </span>
                  <FontAwesomeIcon icon={faSpotify} transform="grow-6" />
                </button>
              </div>
              <div className="bounce" onClick={executeScroll}>
                <FontAwesomeIcon icon={faArrowDown} size="6x" />
              </div>
            </Container>
            <div {...scrollHtmlAttributes}>
              <Tour theme={props.theme} />
            </div>
          </>
        );
      }}
    />
  );
};

export default Landing;
