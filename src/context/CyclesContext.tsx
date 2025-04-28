import { createContext, useReducer, useState } from 'react';
import { Cycle, cyclesReducers } from '../reducers/cycles/reducer';
import { addNewCycle, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from '../reducers/cycles/actions';

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface CycleContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (number: number) => void;
  createNewCycle: (data: CreateCycleData) => void;
  interuptCurrentCycle: () => void;
}

export const CycleContext = createContext({} as CycleContextType);

export function CycleContextProvider({ children }: { children: React.ReactNode }) {
  const [cyclesStates, dispatch] = useReducer(cyclesReducers, {
    cycles: [],
    activeCycleId: null,
  });

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
  const { cycles, activeCycleId } = cyclesStates;

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction());
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    dispatch(addNewCycle(newCycle));
    setAmountSecondsPassed(0);
  }

  function interuptCurrentCycle() {
    dispatch(interruptCurrentCycleAction());
  }

  return (
    <CycleContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interuptCurrentCycle,
      }}
    >
      {children}
    </CycleContext.Provider>
  );
}
