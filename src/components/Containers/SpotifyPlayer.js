import React from 'react';
import { useSpring, animated } from 'react-spring';

const SpotifyPlayer = props => {
  const mainFade = useSpring({
    from: {
      opacity: 0,
    },

    opacity: 1,
  });
  return (
    <animated.iframe
      style={mainFade}
      title="Spotify"
      className="SpotifyPlayer"
      width={props.size.width}
      height={props.size.height}
      frameBorder="0"
      src={
        'https://embed.spotify.com/?uri=' + props.uri + '&view=' + props.view
      }
    />
  );
};

export default SpotifyPlayer;
