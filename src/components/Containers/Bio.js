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
    font-size: 3em;
    color: ${props => props.theme.white};
    border-bottom: 3px solid ${props => props.theme.blue};
    text-align: center;
    margin: 0 auto;
  }
  h2 {
    color: ${props => props.theme.white};
    text-align: center;
  }
  h3 {
    width: 80%;
    margin: 1em auto;
    color: ${props => props.theme.white};
    max-width: 960px;
  }
  .bio {
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;

    p {
      width: 80%;
      margin: 0.5em auto;
      max-width: 960px;
    }
  }
  .divider {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 0 auto;
    width: 100%;
    max-width: 960px;
    .rig {
      p {
        width: 80%;
        color: ${props => props.theme.blue};
        margin: 0.5em auto;
      }
      ul {
        width: 80%;
        margin: 0 auto;

        padding: 0;
        max-width: 960px;
      }
    }
    .socials {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      a {
        .fa-instagram {
          color: ${props => props.theme.white};
          position: relative;
          width: 96px;
          height: 96px;
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
  }
  .socials {
    margin-top: 1em;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    a {
      .fa-instagram {
        color: ${props => props.theme.white};
        position: relative;
        width: 96px;
        height: 96px;
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
        <h2>{props.data.position}</h2>
        <div
          className="bio"
          dangerouslySetInnerHTML={{
            __html: props.data.bio.childMarkdownRemark.html,
          }}
        />
        {props.data.rig ? (
          <div className="divider">
            <div
              className="rig"
              dangerouslySetInnerHTML={{
                __html: props.data.rig.childMarkdownRemark.html,
              }}
            />

            <div className="socials">
              {props.data.socialLinks.map((link, index) => {
                return (
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    {socials[index]}
                  </a>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="socials">
            {props.data.socialLinks.map((link, index) => {
              return (
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {socials[index]}
                </a>
              );
            })}
          </div>
        )}
      </Container>
    </animated.div>
  );
};

export default Bio;

const socials = [
  <FontAwesomeIcon icon={faInstagram} size="6x" />,
  <FontAwesomeIcon icon={faTwitter} size="6x" />,
  <FontAwesomeIcon icon={faFacebook} size="6x" />,
  <FontAwesomeIcon icon={faGithub} size="6x" />,
  <FontAwesomeIcon icon={faTwitch} size="6x" />,
];
