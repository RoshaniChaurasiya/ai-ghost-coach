import { useCallback, useMemo, useState } from 'react';
import { AuthContext } from './authContextValue';
import { v4 as uuidv4 } from 'uuid';
import {
  getCurrentUser,
  getUsers,
  saveUsers,
  setCurrentUser,
} from '../services/storage';
import { ERROR_MESSAGES } from '../utils/errors';

function withoutPassword(user) {
  const { password, ...safeUser } = user;
  void password;
  return safeUser;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getCurrentUser());

  const register = useCallback((formData) => {
    const users = getUsers();
    const email = formData.email.trim().toLowerCase();

    if (users.some((u) => u.email === email)) {
      return { ok: false, error: ERROR_MESSAGES.EMAIL_EXISTS };
    }

    const newUser = {
      id: uuidv4(),
      email,
      name: formData.name.trim(),
      age: formData.age,
      sport: formData.sport,
      role: formData.role,
      level: formData.level,
      password: formData.password,
    };

    saveUsers([...users, newUser]);
    const safeUser = withoutPassword(newUser);
    setCurrentUser(safeUser);
    setUser(safeUser);
    return { ok: true };
  }, []);

  const login = useCallback((email, password) => {
    const users = getUsers();
    const normalized = email.trim().toLowerCase();
    const match = users.find(
      (u) => u.email === normalized && u.password === password,
    );

    if (!match) {
      return { ok: false, error: 'Invalid email or password.' };
    }

    const safeUser = withoutPassword(match);
    setCurrentUser(safeUser);
    setUser(safeUser);
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, register, login, logout, isAuthenticated: Boolean(user) }),
    [user, register, login, logout],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}
