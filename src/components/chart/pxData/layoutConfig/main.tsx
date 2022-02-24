import React from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Offcanvas from 'react-bootstrap/Offcanvas';

import {PxChartLayoutConfig, PxChartLayoutConfigKeys} from '../type';


type Props = {
  title: string,
  config: PxChartLayoutConfig,
  setConfig: (newConfig: PxChartLayoutConfig) => void
};

export const PxChartLayoutConfigPanel = ({title, config, setConfig}: Props) => {
  const [show, setShow] = React.useState(false);

  return (
    <>
      <Button size="sm" variant="outline-info" className="me-2" onClick={() => setShow(true)}>
        Layout Config
      </Button>
      <Offcanvas show={show} onHide={() => setShow(false)} placement="end" style={{width: '15vw'}}>
        <div className="mb-0"/>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {`Layout Config (${title})`}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <hr className="my-0"/>
        <Offcanvas.Body>
          <Form>
            {Object.entries(config).map(([key, entry]) => {
              const configKey = key as PxChartLayoutConfigKeys;
              const {title, enable} = entry;

              return (
                <Button
                  size="lg"
                  className="w-100 mb-3 bg-gradient"
                  key={key}
                  variant={enable ? 'outline-success' : 'outline-danger'}
                  onClick={() => setConfig({
                    ...config,
                    [configKey]: {title, enable: !enable},
                  })}
                >
                  {title}
                </Button>
              );
            })}
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
