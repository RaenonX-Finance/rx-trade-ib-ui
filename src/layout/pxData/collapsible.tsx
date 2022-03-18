import React from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import {useAnimation} from '../../hooks/animation';
import {PxDataIndividual, PxDataIndividualProps} from './individual';
import styles from './main.module.scss';


type Props = PxDataIndividualProps;

export const PxDataCollapsible = (props: Props) => {
  const {title, pxData} = props;
  const [show, setShow] = React.useState(false);
  const buttonRef = useAnimation<HTMLButtonElement>({
    deps: [title],
  });

  const lastBar = pxData.data.at(-1);

  return (
    <>
      <Button
        className={styles['collapsible-button']}
        variant={
          lastBar ?
            ((lastBar.close - lastBar.open) > 0 ? 'outline-success' : 'outline-danger') :
            'outline-light'
        }
        onClick={() => setShow(!show)}
        ref={buttonRef}
      >
        {title}
      </Button>
      <Modal show={show} size="xl" centered onHide={() => setShow(false)}>
        <Modal.Body style={{backgroundColor: '#212626'}}>
          <PxDataIndividual {...props}/>
        </Modal.Body>
      </Modal>
    </>
  );
};
