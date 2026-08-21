'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { socketService } from '@/services/socket';
import { setSocketConnected } from '@/store/chatSlice';

export function useSocket() {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (!token) {
      socketService.disconnect();
      dispatch(setSocketConnected(false));
      return;
    }

    const socket = socketService.connect(token);

    const onConnect = () => {
      dispatch(setSocketConnected(true));
    };

    const onDisconnect = () => {
      dispatch(setSocketConnected(false));
    };

    const onError = () => {
      dispatch(setSocketConnected(false));
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('connect_error', onError);

    if (socket.connected) {
      dispatch(setSocketConnected(true));
    }

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('connect_error', onError);
    };
  }, [token, dispatch]);
}
