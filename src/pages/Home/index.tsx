import { HandPalm, Play } from 'phosphor-react';
import { HomeContainer, StartCountdownButton, StopCountdownButton } from './styles';
import { createContext, useState } from 'react';
import NewCycleForm from './Components/NewCycleForm';
import Countdown from './Components/Countdown';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CycleContextType {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (number: number) => void;
}

export const CycleContext = createContext({} as CycleContextType);

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Please enter a task'),
  minutesAmount: zod
    .number()
    .min(5, 'The cycle must be at least 5 minutes')
    .max(60, 'The cycle must be at most 60 minutes'),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

const Home = () => {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => (cycle.id === activeCycleId ? { ...cycle, finishedDate: new Date() } : cycle)),
    );
  }

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    setCycles((prevState) => [...prevState, newCycle]);
    setActiveCycleId(id);
    setAmountSecondsPassed(0);
    reset();
  }

  function handleInteruptCycle() {
    setCycles(cycles.map((cycle) => (cycle.id === activeCycleId ? { ...cycle, interruptedDate: new Date() } : cycle)));
    setActiveCycleId(null);
  }

  const task = watch('task');
  const isSubmitDisabled = !task;
  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <CycleContext.Provider
          value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondsPassed, setSecondsPassed }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
          {activeCycle ? (
            <StopCountdownButton type="button" onClick={handleInteruptCycle}>
              <HandPalm size={24} />
              Stop
            </StopCountdownButton>
          ) : (
            <StartCountdownButton disabled={isSubmitDisabled} type="submit">
              <Play size={24} />
              Start
            </StartCountdownButton>
          )}
        </CycleContext.Provider>
      </form>
    </HomeContainer>
  );
};

export default Home;
