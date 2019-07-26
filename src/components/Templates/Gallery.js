import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

import MediaWrapper from '../Containers/MediaWrapper';
import img from '../../images/casey-horner-1sim8ojvCbE-unsplash.jpg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.black};
  background-image: url(${img});
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 90vh;
  overflow: auto;
  .wrapper {
    .buttons {
      background: transparent;
    }

    padding: 2rem;
    min-width: 60%;
    box-sizing: border-box;
    min-height: 60%;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 1rem;
    overflow: auto;
    ::-webkit-scrollbar {
      width: 0px; /* Remove scrollbar space */
    }
  }
`;

const Media = props => {
  const mainFade = useSpring({
    from: {
      opacity: 0,
    },

    opacity: 1,
  });

  return (
    <StaticQuery
      query={query}
      render={data => {
        const media = data.allInstagramContent.edges;
        return (
          <Container theme={props.theme}>
            <animated.div className="wrapper" style={mainFade}>
              <MediaWrapper media={media} theme={props.theme} />
            </animated.div>
          </Container>
        );
      }}
    />
  );
};

export default Media;

const query = graphql`
  query {
    allInstagramContent(limit: 24) {
      edges {
        node {
          link
          type
          comments {
            count
          }
          likes {
            count
          }
          caption {
            text
          }
          videos {
            standard_resolution {
              url
            }
          }
          images {
            standard_resolution {
              url
            }
          }
        }
      }
    }
  }
`;

// wait till all images are loading before fading in the background
// possibly using gatsby-background-image
// https://www.javascriptstuff.com/react-image-gallery/
