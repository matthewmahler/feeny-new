import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faTwitter,
  faFacebook,
  faGithub,
  faSpotify,
  faTwitch,
} from '@fortawesome/free-brands-svg-icons';
import Bio from './Bio';
import Rig from './Rig';

const Container = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: space-between;
  color: ${props => props.theme.lightGray};

  .wrapper {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-content: center;
    justify-content: center;
    .socials2 {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-content: center;
      justify-content: center;
      text-align: center;
      grid-column-end: span 2;
      a {
        color: ${props => props.theme.white};
        margin: 1rem;
      }
    }
  }
  .bioWrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    .bio {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: center;
      text-align: center;
      p {
        width: 80%;
        margin: 1em auto;
      }
    }
    .socials {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-content: center;
      justify-content: center;
      text-align: center;
      a {
        color: ${props => props.theme.white};
        margin: 1rem;
      }
    }
  }
  h1 {
    font-size: 3rem;
    padding: 0;
    color: ${props => props.theme.white};
    border-bottom: 3px solid ${props => props.theme.blue};
    text-align: center;
    margin: 0 auto;
  }
  h2 {
    font-size: 2rem;
    margin: 0 auto;
    color: ${props => props.theme.white};
    text-align: center;
  }
  @media only screen and (max-width: 420px) {
    padding: 0;
    h1 {
      font-size: 2rem;
    }
    h2 {
      font-size: 1.5rem;
    }
    .wrapper {
      display: flex;
      flex-direction: column;
    }
  }
`;

const BioContainer = props => {
  const mainFade = useSpring({
    from: {
      opacity: 0,
    },

    opacity: 1,
  });

  return (
    <animated.div style={mainFade}>
      <Container theme={props.theme}>
        <h1>{props.data.name} </h1>
        {props.data.position && <h2>{props.data.position}</h2>}

        {props.data.rig ? (
          <div className="wrapper">
            <Bio theme={props.theme} data={props.data} />
            <Rig theme={props.theme} data={props.data} />
            <div className="socials2">
              {props.data.socialLinks.map((link, index) => {
                return (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={index}
                  >
                    {props.data.name === 'Matt Mahler'
                      ? mattSocials[index]
                      : socials[index]}
                  </a>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="bioWrapper">
            <div>
              <div
                className="bio"
                dangerouslySetInnerHTML={{
                  __html: props.data.bio.childMarkdownRemark.html,
                }}
              />
              <div className="socials">
                {props.data.socialLinks.map((link, index) => {
                  return (
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={index}
                    >
                      {socials[index]}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </Container>
    </animated.div>
  );
};

export default BioContainer;

const socials = [
  <FontAwesomeIcon icon={faInstagram} size="3x" />,
  <FontAwesomeIcon icon={faTwitter} size="3x" />,
  <FontAwesomeIcon icon={faFacebook} size="3x" />,
  <FontAwesomeIcon icon={faSpotify} size="3x" />,
];

const mattSocials = [
  <FontAwesomeIcon icon={faInstagram} size="3x" />,
  <FontAwesomeIcon icon={faGithub} size="3x" />,
  <FontAwesomeIcon icon={faTwitch} size="3x" />,
];
