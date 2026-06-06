import { useContext } from 'react';
import { AuthContext } from '../context/authContextValue';
import { ERROR_MESSAGES } from '../utils/errors';

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error(ERROR_MESSAGES.AUTH_CONTEXT);
  }
  return ctx;
}
