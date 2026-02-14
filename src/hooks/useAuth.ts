// src/hooks/useAuth.ts - 认证相关的自定义 hook
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './useRedux';
import { setUser, setToken, clearAuth } from '../store/authSlice';

export function useAuth() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  const login = useCallback((username: string, password: string) => {
    // 这里可以添加实际的登录逻辑
    dispatch(setUser({ username, password }));
    const mockToken = `token_${Date.now()}`;
    dispatch(setToken(mockToken));
    localStorage.setItem('authToken', mockToken);
    localStorage.setItem('authenticated', 'true');
    return mockToken;
  }, [dispatch]);

  const logout = useCallback(() => {
    dispatch(clearAuth());
    localStorage.removeItem('authToken');
    localStorage.removeItem('authenticated');
  }, [dispatch]);

  const updateToken = useCallback((token: string) => {
    dispatch(setToken(token));
  }, [dispatch]);

  return {
    ...auth,
    login,
    logout,
    updateToken,
    isAuthenticated: auth.isAuthenticated,
  };
}