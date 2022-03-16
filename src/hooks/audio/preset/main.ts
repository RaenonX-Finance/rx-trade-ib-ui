import {useAudio} from '../base/main';
import {AudioPlayOptions} from '../base/type';
import {UsePresetAudioReturn} from './type';


const commonOptions: Pick<AudioPlayOptions, 'gain' | 'fadeOutSec' | 'oscType'> = {
  gain: {
    start: 0.5,
    end: 0.001,
  },
  fadeOutSec: 0.25,
  oscType: 'sine',
};

export const usePresetAudio = (): UsePresetAudioReturn => {
  const {playAudio} = useAudio();

  // Sound config copied from
  // https://github.com/Tucsky/aggr/blob/a6194b8ec7456d8edcbd29e05529091ae3ee1de4/src/store/panesSettings/trades.ts
  const playBuy = () => {
    playAudio([
      {
        ...commonOptions,
        frequency: 659.26,
        delayMs: 0,
        durationSec: 0.25,
      },
      {
        ...commonOptions,
        frequency: 830.6,
        delayMs: 80,
        durationSec: 0.5,
      },
      {
        ...commonOptions,
        frequency: 987.76,
        delayMs: 80,
        durationSec: 0.75,
      },
      {
        ...commonOptions,
        frequency: 1318.52,
        delayMs: 80,
        durationSec: 1,
      },
    ]);
  };

  const playSell = () => {
    playAudio([
      {
        ...commonOptions,
        frequency: 493.88,
        delayMs: 0,
        durationSec: 0.25,
      },
      {
        ...commonOptions,
        frequency: 369.99,
        delayMs: 80,
        durationSec: 0.5,
      },
      {
        ...commonOptions,
        frequency: 293.66,
        delayMs: 80,
        durationSec: 0.75,
      },
      {
        ...commonOptions,
        frequency: 246.94,
        delayMs: 80,
        durationSec: 1,
      },
    ]);
  };

  return {playBuy, playSell};
};
