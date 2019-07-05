import React from 'react';
import { animated, useTrail } from 'react-spring';
import Masonry from 'react-masonry-css';
import InstagramPhoto from '../Containers/InstagramPhoto';
import InstagramVideo from '../Containers/InstagramVideo';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  .mediaWrapper {
    padding: 3em;
    width: 80%;
    height: 80%;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 1em;
    .my-masonry-grid {
      display: -webkit-box; /* Not needed if autoprefixing */
      display: -ms-flexbox; /* Not needed if autoprefixing */
      display: flex;
      margin-left: -30px; /* gutter size offset */
      width: 100%;
    }
    .my-masonry-grid_column {
      padding-left: 30px; /* gutter size */
      background-clip: padding-box;
    }
    .my-masonry-grid_column > div {
      /* change div to reference your elements you put in <Masonry> */
      background: grey;
      margin-bottom: 30px;
    }
    @media all and (max-width: 1200px) {
      grid-template-columns: 1fr;
      grid-gap: 15px;
      .my-masonry-grid {
        margin-left: -15px; /* gutter size offset */
      }
      .my-masonry-grid_column {
        padding-left: 15px; /* gutter size offset */
      }
      .my-masonry-grid_column > div {
        margin-bottom: 15px; /* space between items */
      }
    }
    .insta-container {
      box-sizing: border-box;
      will-change: transform;
      background-color: transparent;
      box-shadow: 10px 10px 5px 0px ${props => props.theme.black}cc;
      transition: 0.2s;
      :hover {
        transition: 0s;
        box-shadow: 10px 10px 5px 0px ${props => props.theme.white}cc;
      }
      a {
        border-bottom: none;
      }
      img,
      video {
        width: 100%;
      }
      img {
        opacity: 1;
        display: block;
        width: 100%;
        height: auto;

        backface-visibility: hidden;
      }
    }
  }
`;

const MediaWrapper = props => {
  const trail = useTrail(props.media.length, {
    marginLeft: 0,
    opacity: 1,
    transform: 'translate3d(0,0px,0)',
    from: {
      marginRight: -200,
      opacity: 0,
      transform: 'translate3d(0,-20px,0)',
    },
  });
  const breakpointColumnsObj = {
    default: 3,
    1200: 4,
    991: 3,
    768: 2,
  };
  return (
    <Container theme={props.theme}>
      <div className="mediaWrapper">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {trail.map((animation, i) => {
            return props.media[i].node.videos == null ? (
              <animated.div key={i} style={animation}>
                <InstagramPhoto key={i}>
                  <a href={props.media[i].node.link}>
                    <img
                      src={props.media[i].node.images.standard_resolution.url}
                      alt=""
                    />
                  </a>
                </InstagramPhoto>
              </animated.div>
            ) : (
              <animated.div key={i} style={animation}>
                <InstagramVideo key={i}>
                  <a href={props.media[i].node.link}>
                    <video
                      src={props.media[i].node.videos.standard_resolution.url}
                      controls
                    />
                  </a>
                </InstagramVideo>
              </animated.div>
            );
          })}
        </Masonry>
      </div>
    </Container>
  );
};

export default MediaWrapper;
