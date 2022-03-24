import {ExecutionGroup} from '../../types/execution';


export type TradeLogProps = {
  executions: ExecutionGroup[],
  symbol: string,
};

export type RealizedExecutionGroup = Omit<ExecutionGroup, 'realizedPnLSum'> & {
  realizedPnLSum: number,
};

export const isRealizedExecution = (execution: ExecutionGroup): execution is RealizedExecutionGroup => {
  return !!execution.realizedPnLSum;
};
