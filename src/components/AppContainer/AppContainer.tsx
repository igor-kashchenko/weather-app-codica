import { Container } from '@mui/material';
import React from 'react';

type Props = {
  children: React.ReactNode;
}

export const AppContainer: React.FC<Props> = ({ children }) => {
  return (
    <Container sx={{minHeight: '100vh', bgcolor: 'background.paper', py: 2}}>
      {children}
    </Container>
  );
};
