import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, restore session from storage
  useEffect(() => {
    const storedToken = sessionStorage.getItem('accessToken');
    const storedUser  = sessionStorage.getItem('user');
    if (storedToken && storedUser) {
      setAccessToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (identifier, password, role) => {
    const response = await authService.login(identifier, password, role);
    const payload = response.data?.data || response.data || {};
    const token = payload.accessToken;
    const userData = payload.user;

    if (!userData) {
      throw new Error('Authentication succeeded but user profile was not returned');
    }

    setAccessToken(token);
    setUser(userData);
    sessionStorage.setItem('accessToken', token);
    sessionStorage.setItem('user', JSON.stringify(userData));
    return userData;
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (_) {
      // swallow — still clear local state
    } finally {
      setAccessToken(null);
      setUser(null);
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('user');
    }
  }, []);

  const updateToken = useCallback((newToken) => {
    setAccessToken(newToken);
    sessionStorage.setItem('accessToken', newToken);
  }, []);

  const isAuthenticated = !!user && !!accessToken;

  const hasRole = useCallback((role) => {
    if (!user) return false;
    return user.role === role;
  }, [user]);

  return (
    <AuthContext.Provider value={{
      user,
      accessToken,
      loading,
      isAuthenticated,
      login,
      logout,
      updateToken,
      hasRole,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
