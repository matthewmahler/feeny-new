import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  iframe {
    display: ${props => (props.isLoading ? 'none' : 'auto')};
  }
  @media all and (max-width: 1200px) {
    padding-right: 0;
  }
`;

const Video = props => {
  return (
    <Container theme={props.theme} isLoading={props.loading}>
      {props.loading ? (
        '...Loading...'
      ) : (
        <iframe
          title="youtube"
          width={props.size.width}
          height={props.size.height}
          src={`https://www.youtube.com/embed/${
            props.loading ? '' : props.video.items[0].id.videoId
          }`}
          frameBorder="0"
          allowFullScreen
        />
      )}
    </Container>
  );
};

export default Video;
