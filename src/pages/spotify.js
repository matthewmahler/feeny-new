import React, { useEffect } from 'react';

const Spotify = () => {
  useEffect(() => {
    window.location.href =
      'https://open.spotify.com/artist/4TWQJppHQYlY4FlzuvEDUc';
  }, []);
  return <div>Redirecting</div>;
};

export default Spotify;
