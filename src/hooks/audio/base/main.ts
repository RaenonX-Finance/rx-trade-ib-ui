import React from 'react';

import {AudioPlayOptions, AudioPlayQueue, AudioPlayQueueItem, UseAudioReturn} from './type';


export const useAudio = (): UseAudioReturn => {
  const audioQueue = React.useRef<AudioPlayQueue>([]);

  const playAudioInternal = async (queueItem: AudioPlayQueueItem) => {
    const {currentIdx, opts} = queueItem;

    const {
      frequency,
      gain,
      fadeOutSec,
      durationSec,
      oscType,
    } = opts[currentIdx];
    const context = new AudioContext();
    const source = new OscillatorNode(context);
    const gainNode = new GainNode(context);

    source.frequency.value = frequency;
    source.type = oscType;
    source.onended = () => gainNode.disconnect();

    gainNode.connect(context.destination);
    source.connect(gainNode);

    // Set volume
    gainNode.gain.setValueAtTime(gain.start, 0);
    gainNode.gain.exponentialRampToValueAtTime(gain.end, durationSec + fadeOutSec);

    // Actual audio playing
    source.start();
    source.stop(durationSec + fadeOutSec);
  };

  const playAudio = (opts: AudioPlayOptions[]) => {
    opts.sort((a, b) => a.delayMs - b.delayMs);
    const {delayMs} = opts[0];

    audioQueue.current.push({
      opts,
      playEpochMs: Date.now() + delayMs,
      currentIdx: 0,
      playing: false,
    });
  };

  // Recursive call to check for pending audio
  const infiniteLoop = () => {
    const now = Date.now();

    audioQueue.current = audioQueue.current.filter((queueItem) => {
      const {playEpochMs, playing, currentIdx, opts} = queueItem;

      if (now < playEpochMs && !playing) {
        return true;
      }

      queueItem.playing = true;
      playAudioInternal(queueItem).catch(console.error);
      queueItem.playing = false;

      const canAdvance = currentIdx + 1 < opts.length;
      if (canAdvance) {
        queueItem.currentIdx += 1;
      }
      // Need to use `queueItem.currentIdx` for getting the latest index
      // Also need to place this call after `currentIdx` update
      queueItem.playEpochMs = Date.now() + opts[queueItem.currentIdx].delayMs;
      return canAdvance;
    });

    requestAnimationFrame(infiniteLoop);
  };

  requestAnimationFrame(infiniteLoop);

  return {playAudio};
};
