import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faTwitter,
  faFacebook,
  faGithub,
  faTwitch,
} from '@fortawesome/free-brands-svg-icons';
const Container = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  color: ${props => props.theme.lightBlue};
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
  .bio {
    max-height: 300px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: start;

    p {
      font-size: 1.3rem;
      width: 100%;
      margin: 0 auto;
      margin-bottom: 1rem;
      max-width: 960px;
    }
  }
  .divider {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem;
    margin: 0 auto;
    width: 100%;
    max-width: 960px;
    .bio {
      max-height: 300px;
      overflow: auto;
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: start;
      margin-top: 0.5rem;
      p {
        font-size: 1rem;
        width: 100%;
        margin: 0 auto;

        max-width: 960px;
      }
    }
    .rig {
      max-height: 300px;
      overflow: auto;
      h3 {
        font-size: 1.5rem;
        width: 100%;
        margin: 0 auto;
        margin-bottom: 0.5rem;
        color: ${props => props.theme.white};
        max-width: 960px;
      }
      p {
        font-size: 1rem;
        width: 100%;
        color: ${props => props.theme.blue};
        margin: 0 auto;
        margin-bottom: 0.5rem;
      }
      ul {
        font-size: 1rem;
        width: 100%;
        margin: 0 auto;
        margin-bottom: 1rem;
        padding: 0;
        max-width: 960px;
      }
    }
  }
  .socials {
    margin: 0.5em auto;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    a {
      margin: 0 1rem;
      .fa-instagram {
        color: ${props => props.theme.white};
        position: relative;
        width: 32px;
        height: 32px;
        border-radius: 20%;
        background: radial-gradient(
          circle at 33% 100%,
          #fed373 4%,
          #f15245 30%,
          #d92e7f 62%,
          #9b36b7 85%,
          #515ecf
        );
      }
      .fa-instagram:after,
      .fa-instagram:before {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 25px;
        height: 25px;
        border: 2px solid #fff;
        transform: translate(-50%, -50%);
        content: '';
      }
      .fa-instagram:before {
        border-radius: 20%;
      }
      .fa-instagram:after {
        width: 11px;
        height: 11px;
        border-radius: 50%;
      }
      .fa-twitter {
        color: #1da1f2;
      }
      .fa-facebook {
        color: #1877f2;
      }
      .fa-github {
        border-radius: 100px;
        background-color: #333;
        color: #fafafa;
      }
      .fa-twitch {
        color: #6441a4;
      }
    }
  }
`;

const Bio = props => {
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

        {props.data.rig ? (
          <div className="divider">
            <div
              className="bio"
              dangerouslySetInnerHTML={{
                __html: props.data.bio.childMarkdownRemark.html,
              }}
            />
            <div
              className="rig"
              dangerouslySetInnerHTML={{
                __html: props.data.rig.childMarkdownRemark.html,
              }}
            />
          </div>
        ) : (
          <div
            className="bio"
            dangerouslySetInnerHTML={{
              __html: props.data.bio.childMarkdownRemark.html,
            }}
          />
        )}
      </Container>
    </animated.div>
  );
};

export default Bio;

const socials = [
  <FontAwesomeIcon icon={faInstagram} size="2x" />,
  <FontAwesomeIcon icon={faTwitter} size="2x" />,
  <FontAwesomeIcon icon={faFacebook} size="2x" />,
  <FontAwesomeIcon icon={faGithub} size="2x" />,
  <FontAwesomeIcon icon={faTwitch} size="2x" />,
];
