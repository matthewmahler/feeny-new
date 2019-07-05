import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  iframe {
    min-height: 400px;
    height: 100%;
  }
  @media all and (max-width: 1200px) {
    padding-right: 0;
    iframe {
      height: 300px;
    }
  }
`;

const Video = props => {
  return (
    <Container theme={props.theme}>
      <h2>
        <span>Latest Video</span>
      </h2>
      <iframe
        title="youtube"
        width="100%"
        src="https://www.youtube.com/embed/Uzups6A1RVQ"
        frameBorder="0"
        allowFullScreen
        onLoad={() => props.onLoad(false)}
      />
    </Container>
  );
};

export default Video;
