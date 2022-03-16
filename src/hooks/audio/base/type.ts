export type AudioPlayOptions = {
  frequency: number,
  gain: {
    start: number,
    end: number,
  },
  fadeOutSec: number,
  durationSec: number,
  oscType: OscillatorType,
  delayMs: number,
};

export type AudioPlayQueueItem = {
  opts: AudioPlayOptions[],
  currentIdx: number,
  playing: boolean,
  playEpochMs: number,
};

export type AudioPlayQueue = AudioPlayQueueItem[];

export type AudioPlayFunc = (args: AudioPlayOptions[]) => void;

export type UseAudioReturn = {
  playAudio: AudioPlayFunc,
};
