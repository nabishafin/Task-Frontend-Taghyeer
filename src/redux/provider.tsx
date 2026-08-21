'use client';

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { initAuth } from './authSlice';

function AuthInitializer({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    store.dispatch(initAuth());
  }, []);

  return <>{children}</>;
}

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthInitializer>{children}</AuthInitializer>
    </Provider>
  );
}
