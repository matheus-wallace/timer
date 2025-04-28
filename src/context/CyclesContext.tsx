import { createContext, useEffect, useReducer, useState } from 'react';
import { Cycle, cyclesReducers } from '../reducers/cycles/reducer';
import { addNewCycle, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from '../reducers/cycles/actions';
import { differenceInSeconds } from 'date-fns';

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
  const [cyclesStates, dispatch] = useReducer(
    cyclesReducers,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      const stateJSON = localStorage.getItem('@ignite-timer:cycles-state-1.0.0');
      if (stateJSON) {
        return JSON.parse(stateJSON);
      }
      return initialState;
    },
  );

  const { cycles, activeCycleId } = cyclesStates;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
    }
    return 0;
  });

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesStates);
    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON);
  }, [cyclesStates]);

  // useEffect(() => {
  //   const stateJSON = localStorage.getItem('@ignite-timer:cycles-state-1.0.0');
  //   if (stateJSON) {
  //     return JSON.parse(stateJSON);
  //   }
  // }, []);

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
