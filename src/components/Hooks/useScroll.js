import { useRef } from 'react';

const useScroll = () => {
  const ref = useRef();
  const executeScroll = () => {
    window.scrollTo(0, ref.current.offsetTop);
  };
  const htmlElementAttributes = { ref };

  return [executeScroll, htmlElementAttributes];
};

export default useScroll;
