import { useContext } from 'react';
import { HistoryContainer, HistoryList, Status } from './styles';
import { CycleContext } from '../../context/CyclesContext';
import { formatDistanceToNow } from 'date-fns';

const History = () => {
  const { cycles } = useContext(CycleContext);
  return (
    <HistoryContainer>
      <h1>My history</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th>Beginning</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount} minutes</td>
                  <td>{formatDistanceToNow(new Date(cycle.startDate), { addSuffix: true })}</td>
                  <td>
                    {cycle.finishedDate && <Status statusColor="green">Finished</Status>}
                    {cycle.interruptedDate && <Status statusColor="red">Interrupted</Status>}
                    {!cycle.finishedDate && !cycle.interruptedDate && <Status statusColor="yellow">In progress</Status>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
};

export default History;
