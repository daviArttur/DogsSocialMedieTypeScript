import React from 'react';

const useMedia = (value) => {
  const [media, setMedia] = React.useState(null);

  React.useEffect(() => {
    function calcMatches() {
      const { matches } = window.matchMedia(value);
      setMedia(matches);
    }
    calcMatches();
    window.addEventListener('resize', calcMatches);
    return () => {
      window.removeEventListener('resize', calcMatches);
    };
  }, [value]);

  return media;
};

export default useMedia;
