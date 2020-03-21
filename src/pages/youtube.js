import React, { useEffect } from 'react';

const Youtube = () => {
  useEffect(() => {
    window.location.href =
      'https://www.youtube.com/channel/UCbVpSIpg8knuWNftRyXaSQQ';
  }, []);
  return <div>Redirecting</div>;
};

export default Youtube;
