/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';

import { Play } from 'phosphor-react';

import {
  CountDownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput
} from './style';

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(5).max(60),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
}

export const Home = () => {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null) // deixar ele como nulo, significa, que ele pode ser nulo no inicio, então devemos deixar como string ou null
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })

  function handleCreateNewCycle(data: NewCycleFormData){
    const id = String(new Date().getTime()); // vai pegar a data atual por milisegundo, e é impossivel criar um id repetitdo

    const newCycle: Cycle = {
      id, 
      task: data.task,
      minutesAmount: data.minutesAmount
    }

    setCycles(state => [...state, newCycle]) // oque eu fiz aqui é para usar função, para sempre que a alteração do estado, depender do valor anterior, nós utilizamos uma arrowFunction com o state, passando ele antes de passar a nova informação
    setActiveCycleId(id)
    
    reset();
  }

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId); // ela vai encontrar qual o id do cicle, que é igual ao id do ciclo ativo.

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');

  const task = watch('task');
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput 
            id="task"
            placeholder="Dê um nome para o seu projeto" 
            list="task-suggestions"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Projeto 4" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput 
            type="number" 
            id="minutesAmount" 
            placeholder="00" 
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', {valueAsNumber: true})}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountDownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountDownContainer>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} /> 
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
