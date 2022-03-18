import React from 'react';

import {UsePresetAudioReturn} from './type';


export const useAudio = (): UsePresetAudioReturn => {
  const bought = React.useRef(new Audio('/audio/bought.mp3'));
  const sold = React.useRef(new Audio('/audio/sold.mp3'));

  React.useEffect(() => {
    // Play the audio in the background as muted on load for later re-use
    bought.current.muted = true;
    bought.current.play().catch(console.error);

    sold.current.muted = true;
    sold.current.play().catch(console.error);
  }, []);

  const playBuy = () => {
    bought.current.muted = false;
    bought.current.play().catch(console.error);
  };

  const playSell = () => {
    sold.current.muted = false;
    sold.current.play().catch(console.error);
  };

  return {playBuy, playSell};
};
