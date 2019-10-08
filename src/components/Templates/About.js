import React, { useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { StaticQuery, graphql } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import BioContainer from '../Containers/BioContainer';
import { useWindowSize } from '../Hooks/useWindowSize';

const Container = styled.div`
  width: 100%;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .cardWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    padding: 2rem;
    max-width: 960px;
    box-sizing: border-box;
    min-height: 45%;
    background-image: linear-gradient(
        to bottom,
        ${props => props.theme.black}cc,
        ${props => props.theme.black}ff
      ),
      url(${props => props.bg});
    background-size: cover;
    background-repeat: no-repeat;
    font-size: 1.2rem;
    border-radius: 1rem;
    box-shadow: 10px 10px 5px 0px ${props => props.theme.black}99;
    .buttons {
      box-sizing: border-box;
      width: 100%;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      justify-content: center;
      align-items: center;
      button {
        text-align: center;
        box-sizing: border-box;
        width: 100%;
        font-size: 1.4rem;
        color: ${props => props.theme.white};

        cursor: pointer;
        background-color: transparent;
        border: none;
        :hover {
          color: ${props => props.theme.blue};
          box-sizing: border-box;
        }
      }
      .selected {
        color: ${props => props.theme.blue};
      }
    }
  }
  @media only screen and (max-width: 420px) {
    section::after,
    section::before {
      background-color: ${props => props.theme.black};
    }
    .cardWrapper {
      padding: 1rem;
      background-color: ${props => props.theme.black};
      font-size: 1rem;
      border-radius: 0;
      .buttons {
        button {
          font-size: 1rem;
        }
      }
    }
  }
`;

const About = props => {
  const mainFade = useSpring({
    from: {
      opacity: 0,
    },

    opacity: 1,
  });

  let [width, height] = useWindowSize();

  const [currentBio, setCurrentBio] = useState(0);

  const buttons = [
    { text: 'The Band' },
    { text: 'Matthew Koerner' },
    { text: 'Jordan Miller' },
    { text: 'Joe MacPhee' },
    { text: 'Matt Mahler' },
  ];

  return (
    <StaticQuery
      query={graphql`
        query AboutQuery {
          contentfulAbout {
            title
            bios {
              name
              bio {
                childMarkdownRemark {
                  html
                }
              }
              rig {
                childMarkdownRemark {
                  html
                }
              }
              socialLinks
              position
              landscapeProfileImage {
                id
                fluid(quality: 100) {
                  aspectRatio
                  base64
                  sizes
                  src
                  srcSet
                  srcSetWebp
                  srcWebp
                  tracedSVG
                }
              }
              portraitProfileImage {
                id
                fluid(quality: 100) {
                  aspectRatio
                  base64
                  sizes
                  src
                  srcSet
                  srcSetWebp
                  srcWebp
                  tracedSVG
                }
              }
            }
          }
        }
      `}
      render={data => {
        const portrait =
          data.contentfulAbout.bios[currentBio].portraitProfileImage.fluid;
        const landscape =
          data.contentfulAbout.bios[currentBio].landscapeProfileImage.fluid;
        return (
          <animated.div style={mainFade}>
            <BackgroundImage
              Tag="section"
              fluid={height > width ? portrait : landscape}
              backgroundColor={props.theme.darkBlue}
              fadeIn={true}
            >
              <Container
                theme={props.theme}
                bg={height > width ? portrait.src : landscape.src}
              >
                <div className="cardWrapper">
                  <div className="buttons">
                    {buttons.map((button, index) => {
                      return (
                        <button
                          onClick={() => setCurrentBio(index)}
                          className={currentBio === index ? 'selected' : null}
                          key={index}
                        >
                          {button.text}
                        </button>
                      );
                    })}
                  </div>
                  <animated.div style={mainFade}>
                    <BioContainer
                      theme={props.theme}
                      data={data.contentfulAbout.bios[currentBio]}
                    />
                  </animated.div>
                </div>
              </Container>
            </BackgroundImage>
          </animated.div>
        );
      }}
    />
  );
};

export default About;
