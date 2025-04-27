import { FormContainer, MinutesAmount, TaskInput } from './styles';
import { CycleContext } from '../../../../context/CyclesContext';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

const NewCycleForm = () => {
  const { activeCycle } = useContext(CycleContext);
  const { register } = useFormContext();

  return (
    <FormContainer>
      <label htmlFor="task">I will work with</label>
      <TaskInput
        placeholder="Give a name to your project"
        list="task-suggestions"
        disabled={!!activeCycle}
        type="text"
        id="task"
        {...register('task')}
      />
      <datalist id="task-suggestions">
        <option value="Project 1" />
        <option value="Project 2" />
        <option value="Project 3" />
      </datalist>
      <label htmlFor="minutesAmount">during</label>
      <MinutesAmount
        disabled={!!activeCycle}
        placeholder="00"
        step={5}
        min={5}
        max={60}
        type="number"
        id="minutesAmount"
        {...register('minutesAmount', { valueAsNumber: true })}
      />
      <span>minutes.</span>
    </FormContainer>
  );
};

export default NewCycleForm;
