import React, { useEffect } from 'react';

const AppleMusic = () => {
  useEffect(() => {
    window.location.href = 'https://music.apple.com/us/artist/feeny/779108235';
  }, []);
  return <div>Redirecting</div>;
};

export default AppleMusic;
