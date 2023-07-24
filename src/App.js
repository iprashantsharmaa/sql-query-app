import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClientProvider } from '@tanstack/react-query';
import { theme } from './config/mui';
import Dashboard from './Dashboard';
import client from './config/react-query';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={client}>
        <Dashboard />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
