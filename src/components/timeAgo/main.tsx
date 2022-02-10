import React from 'react';


type Props = {
  epochSec: number,
  format: (secDiffMs: number) => string,
  updateMs: number,
  className?: string,
};

export const TimeAgo = React.forwardRef<HTMLSpanElement, Props>((
  {epochSec, format, updateMs, className},
  ref,
) => {
  const [secAgo, setSecAgo] = React.useState((Date.now() - epochSec) / 1000);

  React.useEffect(() => {
    const timeoutId = setTimeout(
      () => setSecAgo((Date.now() - epochSec) / 1000),
      updateMs,
    );

    return () => clearTimeout(timeoutId);
  });

  return <span ref={ref} className={className}>{format(secAgo)}</span>;
});
TimeAgo.displayName = 'TimeAgo';
