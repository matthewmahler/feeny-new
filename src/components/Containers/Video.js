import React from 'react';
import styled from 'styled-components';
import { useFetch } from '../Hooks/useFetch';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  iframe {
    display: ${props => (props.loading ? 'none' : 'auto')};
  }
  @media all and (max-width: 1200px) {
    padding-right: 0;
  }
`;

const Video = props => {
  const [data, loading] = useFetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCbVpSIpg8knuWNftRyXaSQQ&maxResults=1&order=date&type=video&key=${process.env.GATSBY_GOOGLE_API_KEY}`
  );

  return (
    <Container theme={props.theme} loading={loading}>
      {loading ? (
        '...Loading...'
      ) : (
        <iframe
          title="youtube"
          width={props.size.width}
          height={props.size.height}
          src={`https://www.youtube.com/embed/${
            loading ? '' : data.items[0].id.videoId
          }`}
          frameBorder="0"
          allowFullScreen
        />
      )}
    </Container>
  );
};

export default Video;
