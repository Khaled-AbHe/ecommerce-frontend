import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { signIn as apiSignIn, signUp as apiSignUp, getMe } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      getMe()
        .then(setUser)
        .catch(() => {
          localStorage.removeItem('accessToken');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const signIn = useCallback(async (email, password) => {
    const { user, accessToken } = await apiSignIn({ email, password });
    localStorage.setItem('accessToken', accessToken);
    setUser(user);
    return user;
  }, []);

  const signUp = useCallback(async (data) => {
    const { user, accessToken } = await apiSignUp(data);
    localStorage.setItem('accessToken', accessToken);
    setUser(user);
    return user;
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('accessToken');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
