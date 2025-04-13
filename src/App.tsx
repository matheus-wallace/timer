import Button from './components/Button';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styles/themes/default';
import { GlobalStyles } from './styles/global';

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <div>
        <Button />
        <Button />
        <Button />
        <Button />
        <p>Texto para testes</p>
      </div>
      <GlobalStyles />
    </ThemeProvider>
  );
}
