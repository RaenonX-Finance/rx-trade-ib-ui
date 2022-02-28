import React from 'react';


type UseAnimationOpts = {
  deps: React.DependencyList,
  onTrigger?: () => void,
};

type UseAnimationReturn = React.RefObject<HTMLElement>;

export const useAnimation = ({deps, onTrigger}: UseAnimationOpts): UseAnimationReturn => {
  const ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    if (onTrigger) {
      onTrigger();
    }

    if (ref.current) {
      // Trigger animation
      ref.current.style.animation = 'none';
      ref.current.offsetHeight;
      ref.current.style.animation = '';
    }
  }, deps);

  return ref;
};
