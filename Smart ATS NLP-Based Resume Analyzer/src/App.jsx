import React from 'react';
import AppRoutes from './componets/AppRoutes';
import ErrorBoundary from './componets/ErrorBoundary';

const App = () => {
  return (
    <ErrorBoundary>
      <AppRoutes />
    </ErrorBoundary>
  );
};

export default App;
