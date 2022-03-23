import React from 'react';


type UseAnimationOpts = {
  deps: React.DependencyList,
  onTrigger?: () => void,
};

type UseAnimationReturn<T> = React.RefObject<T>;

export const useAnimation = <T extends HTMLElement = HTMLElement>({
  deps,
  onTrigger,
}: UseAnimationOpts): UseAnimationReturn<T> => {
  const ref = React.useRef<T>(null);

  React.useEffect(() => {
    if (onTrigger) {
      onTrigger();
    }

    if (ref.current) {
      // Trigger animation
      ref.current.style.animation = 'none';
      // Call the getter to trigger
      // noinspection BadExpressionStatementJS
      ref.current.offsetHeight;
      ref.current.style.animation = '';
    }
  }, deps);

  return ref;
};
