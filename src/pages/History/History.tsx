import { HistoryContainer, HistoryList, Status } from './styles';

const History = () => {
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
            <tr>
              <td>Task</td>
              <td>20 minutes</td>
              <td>2 days erlier</td>
              <td>
                <Status statusColor="green">Done</Status>
              </td>
            </tr>
            <tr>
              <td>Task</td>
              <td>20 minutes</td>
              <td>2 days erlier</td>
              <td>
                <Status statusColor="green">Done</Status>
              </td>
            </tr>
            <tr>
              <td>Task</td>
              <td>20 minutes</td>
              <td>2 days erlier</td>
              <td>
                <Status statusColor="red">Stopped</Status>
              </td>
            </tr>
            <tr>
              <td>Task</td>
              <td>20 minutes</td>
              <td>2 days erlier</td>
              <td>
                <Status statusColor="green">Done</Status>
              </td>
            </tr>
            <tr>
              <td>Task</td>
              <td>20 minutes</td>
              <td>2 days erlier</td>
              <td>
                <Status statusColor="yellow">Doing</Status>
              </td>
            </tr>
            <tr>
              <td>Task</td>
              <td>20 minutes</td>
              <td>2 days erlier</td>
              <td>
                <Status statusColor="green">Done</Status>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
};

export default History;
