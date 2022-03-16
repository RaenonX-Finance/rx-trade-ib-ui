import React from 'react';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import {DisplayEntryType} from './type';


type Props = {
  display: DisplayEntryType,
  setDisplay: (display: DisplayEntryType) => void,
  vertical?: boolean,
  className?: string,
};

export const SignFilterButtons = ({display, setDisplay, className, vertical}: Props) => {
  return (
    <ButtonGroup className={className} vertical={vertical}>
      <Button variant={display === 'pos' ? 'success' : 'outline-success'} onClick={() => setDisplay('pos')}>
        <i className="bi bi-plus-lg"/>
      </Button>
      <Button variant={display === 'neg' ? 'danger' : 'outline-danger'} onClick={() => setDisplay('neg')}>
        <i className="bi bi-dash-lg"/>
      </Button>
      <Button variant={display === 'all' ? 'info' : 'outline-info'} onClick={() => setDisplay('all')}>
        <i className="bi bi-plus-slash-minus"/>
      </Button>
    </ButtonGroup>
  );
};
