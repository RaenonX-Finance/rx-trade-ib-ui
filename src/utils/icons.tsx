import React from 'react';


export const signToDirectionIcon: {[sign in number]: React.ReactNode} = {
  [1]: <>&nbsp;<i className="bi bi-arrow-up-right"/></>,
  [0]: <>&nbsp;<i className="bi bi-arrow-right"/></>,
  [-0]: <>&nbsp;<i className="bi bi-arrow-right"/></>,
  [-1]: <>&nbsp;<i className="bi bi-arrow-down-right"/></>,
  [NaN]: <>&nbsp;<i className="bi bi-question-lg"/></>,
};
