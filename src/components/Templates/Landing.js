import React from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: 60%;
  }
  button {
    margin-top: 1em;
    background-color: ${props => props.theme.darkBlue}77;
    padding: 1em;
    font-size: 1em;
    width: 15vw;
    color: ${props => props.theme.white};
    border: 3px solid ${props => props.theme.blue};
    border-radius: 1em;
  }
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
          <Container theme={props.theme}>
            <div className="full-bg">
              <video autoPlay muted loop>
                <source
                  src={data.contentfulLanding.backgroundVideo.file.url}
                  type="video/mp4"
                />
              </video>
            </div>

            <img src={data.contentfulLanding.logo.fluid.src} alt="logo" />

            <button onClick={() => props.setEntered(true)}>Enter Site</button>
          </Container>
        );
      }}
    />
  );
};

export default Landing;
