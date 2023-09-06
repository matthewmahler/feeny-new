import React, { useState } from 'react';
import { animated, useTrail } from 'react-spring';
import Masonry from 'react-masonry-css';
import InstagramPhoto from '../Containers/InstagramPhoto';
import InstagramVideo from '../Containers/InstagramVideo';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100% !important;
  min-height: 90vh;
  .mediaWrapper {
    padding: 3rem;
    width: 80%;
    min-height: 80%;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

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
      box-shadow: 10px 10px 5px 0px ${(props) => props.theme.black}cc;
      transition: 0.2s;
      :hover {
        transition: 0s;
        box-shadow: 10px 10px 5px 0px ${(props) => props.theme.white}cc;
      }

      .profileImageContainer {
        img,
        video {
          width: 100%;
        }
        img {
          opacity: 1;
          display: block;
          width: 100%;
          height: auto;
          transition: 0.2s;
          backface-visibility: hidden;
        }
        .overlay {
          background-color: ${(props) => props.theme.black}cc;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: absolute;
          width: 80%;
          min-height: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          padding: 0.5rem;
          border-radius: 1rem;
          p {
            color: ${(props) => props.theme.white}ff;
            font-size: 1.2rem;
            text-align: center;
            a {
              color: ${(props) => props.theme.white}ff;
              text-decoration: none;
            }
          }
          .likes {
            font-size: 1rem;
          }
        }
      }
    }
  }
  @media only screen and (max-width: 420px) {
    .mediaWrapper {
      padding: 0;
      margin: 1rem;
      width: 100%;
      .insta-container {
        .profileImageContainer {
          .overlay {
            display: none;
          }
        }
      }
    }
  }
`;

const MediaWrapper = (props) => {
  const [hovered, setHovered] = useState(null);

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
            return props.media[i].media_type !== 'VIDEO' ? (
              <animated.div key={i} style={animation}>
                <InstagramPhoto key={i}>
                  <div
                    className="profileImageContainer"
                    onMouseOver={() => setHovered(i)}
                    onMouseOut={() => setHovered(null)}
                    key={i}
                  >
                    <img src={props.media[i].media_url} alt="" />
                    <div
                      className="overlay"
                      style={{
                        opacity: hovered === i ? 1 : 0,
                        transition: '0.3s',
                      }}
                    >
                      <p>
                        <a
                          href={props.media[i].permalink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {props.media[i].caption}
                        </a>
                      </p>
                    </div>
                  </div>
                </InstagramPhoto>
              </animated.div>
            ) : (
              <animated.div key={i} style={animation}>
                <InstagramVideo key={i}>
                  <div
                    className="profileImageContainer"
                    onMouseOver={() => setHovered(i)}
                    onMouseOut={() => setHovered(null)}
                    key={i}
                  >
                    <video src={props.media[i].media_url} controls />
                    <div
                      className="overlay"
                      style={{
                        opacity: hovered === i ? 1 : 0,
                        transition: '0.3s',
                      }}
                    >
                      <p>
                        <a
                          href={props.media[i].permalink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {props.media[i].caption}
                        </a>
                      </p>
                    </div>
                  </div>
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
