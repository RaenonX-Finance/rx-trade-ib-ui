import React from 'react';

import Table from 'react-bootstrap/Table';

import {Direction} from '../../../../types/common';
import {PxDataExtrema} from '../../../../types/pxData';
import {epochSecToFormattedString} from '../../../../utils/chart';
import {updateEpochSecToLocal} from '../../../../utils/time';
import styles from './main.module.scss';


const directionIcon: {[direction in Direction]: React.ReactNode} = {
  UP: <i className="bi bi-arrow-up-right"/>,
  DOWN: <i className="bi bi-arrow-down-right"/>,
};

const colorClass: {[direction in Direction]: string} = {
  UP: styles['up'],
  DOWN: styles['down'],
};

type Props = {
  points: PxDataExtrema['points'],
};

export const PxExtremaSwingPointsTable = ({points}: Props) => {
  return (
    <div className={styles['swing-points']}>
      <Table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Px</th>
            <th>Direction</th>
            <th>+/-</th>
            <th>Diff SMA x</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {[...points]
            .sort((a, b) => b.epochSec - a.epochSec)
            .map((point, idx) => {
              const cellColorClass = colorClass[point.direction];

              return (
                <tr key={idx}>
                  <td>{epochSecToFormattedString(updateEpochSecToLocal(point.epochSec))}</td>
                  <td>{point.px}</td>
                  <td className={cellColorClass}>{directionIcon[point.direction]}</td>
                  <td className={cellColorClass}>{point.diff}</td>
                  <td>{point.diffSmaRatio.toFixed(3)}</td>
                  <td>{point.length}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};
