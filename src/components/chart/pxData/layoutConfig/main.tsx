import React from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Offcanvas from 'react-bootstrap/Offcanvas';

import {PxChartLayoutConfig, PxChartLayoutConfigEntry, PxChartLayoutConfigKeys} from '../type';


type Props = {
  title: string,
  config: PxChartLayoutConfig,
  setConfig: (newConfig: PxChartLayoutConfig) => void
};

export const PxChartLayoutConfigPanel = ({title, config, setConfig}: Props) => {
  const [show, setShow] = React.useState(false);

  const configGroups: {[group in string]: {[key in PxChartLayoutConfigKeys]: PxChartLayoutConfigEntry}} = {};
  Object.entries(config).forEach(([key, entry]) => {
    configGroups[entry.group] = {
      ...(configGroups[entry.group] || {}),
      [key]: entry,
    };
  });

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
            {Object.entries(configGroups)
              .map(([groupName, entryObj]) => (
                <React.Fragment key={groupName}>
                  <h5>{groupName}</h5>
                  {Object.entries(entryObj).map(([key, entry]) => {
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
                          [configKey]: {...entry, enable: !enable},
                        })}
                      >
                        {title}
                      </Button>
                    );
                  })}
                </React.Fragment>
              ))
            }
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
