import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

import {PxDataIndividual, PxDataIndividualProps} from './individual';
import styles from './main.module.scss';


type Props = PxDataIndividualProps;

export const PxDataCollapsible = (props: Props) => {
  const {title} = props;
  const [show, setShow] = React.useState(false);

  return (
    <>
      <Row>
        <Col>
          <Button className={styles['collapsible-button']} variant="outline-light" onClick={() => setShow(!show)}>
            {title}
          </Button>
        </Col>
      </Row>
      <Modal show={show} size="xl" centered onHide={() => setShow(false)}>
        <Modal.Body style={{backgroundColor: '#212626'}}>
          <PxDataIndividual {...props}/>
        </Modal.Body>
      </Modal>
    </>
  );
};
