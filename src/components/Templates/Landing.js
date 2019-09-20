import React from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';

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
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h1 {
      font-family: 'miller';
      font-style: italic;
      font-size: 10rem;

      font-weight: 300;
      color: ${props => props.theme.white};
      margin: 0.2em auto;
    }
    button {
      :hover {
        color: ${props => props.theme.white};
        border: 5px solid ${props => props.theme.white};
      }
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      padding: 2rem;
      font-size: 2rem;
      font-weight: 600;
      cursor: pointer;
      color: ${props => props.theme.blue};
      border: 5px solid ${props => props.theme.blue};
      border-radius: 1rem;
      span {
        margin-right: 15px;
      }
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
  @media only screen and (max-width: 769px) {
    .landing {
      h1 {
        font-size: 8rem;
      }
    }
  }
  @media only screen and (max-width: 376px) {
    .landing {
      h1 {
        font-size: 3.5rem;
      }
      button {
        :hover {
          border: 2px solid ${props => props.theme.white};
        }
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        background-color: transparent;
        padding: 1rem;
        font-size: 1.5rem;

        border: 2px solid ${props => props.theme.blue};
        border-radius: 1rem;
        span {
          margin-right: 1rem;
        }
      }
    }
  }
`;

const Landing = props => {
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
            </Container>
          </>
        );
      }}
    />
  );
};

export default Landing;
