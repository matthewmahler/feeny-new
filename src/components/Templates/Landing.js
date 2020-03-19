import React from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { useWindowSize } from '../Hooks/useWindowSize';

const Container = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .full-bg {
    display: ${props => (props.height > props.width ? 'none' : 'auto')};
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
    background-image: linear-gradient(
        to bottom,
        ${props => props.theme.black}aa,
        ${props => props.theme.black}aa
      ),
      ${props =>
        props.height > props.width ? 'url(' + props.bg + ')' : 'none'};
    background-size: cover;
    background-repeat: no-repeat;
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
    }
  }

  @media only screen and (max-width: 769px) {
    .landing {
      h1 {
        font-size: 8rem;
      }
    }
  }
  @media only screen and (max-width: 420px) {
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
      }
    }
  }
`;

const Landing = props => {
  let [width, height] = useWindowSize();
  return (
    <StaticQuery
      query={graphql`
        query LandingQuery {
          contentfulLanding {
            title
            ctaText
            ctaLink
            backgroundVideo {
              file {
                url
              }
            }
            backgroundImage {
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
        const portrait = data.contentfulLanding.backgroundImage.file.url;
        const landscape = data.contentfulLanding.backgroundVideo.file.url;

        return (
          <>
            <Container
              theme={props.theme}
              width={width}
              height={height}
              bg={portrait}
            >
              <div className="full-bg">
                <video autoPlay muted loop>
                  <source src={landscape} type="video/mp4" />
                </video>
              </div>
              <div className="landing">
                <h1>{data.contentfulLanding.ctaText}</h1>
                <button
                  onClick={() => window.open(data.contentfulLanding.ctaLink)}
                >
                  <span>
                    {data.contentfulLanding.ctaLink.includes('youtube')
                      ? 'Watch Now on Youtube'
                      : 'Listen Now On Spotify'}
                  </span>
                  <FontAwesomeIcon
                    icon={
                      data.contentfulLanding.ctaLink.includes('youtube')
                        ? faYoutube
                        : faSpotify
                    }
                    transform="grow-6"
                    style={{ marginLeft: '10px' }}
                  />
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
