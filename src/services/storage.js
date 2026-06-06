import { STORAGE_KEYS } from '../utils/constants';

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getUsers() {
  return read(STORAGE_KEYS.USERS, []);
}

export function saveUsers(users) {
  write(STORAGE_KEYS.USERS, users);
}

export function getCurrentUser() {
  return read(STORAGE_KEYS.CURRENT_USER, null);
}

export function setCurrentUser(user) {
  if (user) {
    write(STORAGE_KEYS.CURRENT_USER, user);
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
}

export function getAllSessions() {
  return read(STORAGE_KEYS.SESSIONS, []);
}

export function getSessionsForUser(userId) {
  return getAllSessions()
    .filter((s) => s.userId === userId)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function saveSession(session) {
  const sessions = getAllSessions();
  const index = sessions.findIndex((s) => s.id === session.id);
  if (index >= 0) {
    sessions[index] = session;
  } else {
    sessions.unshift(session);
  }
  write(STORAGE_KEYS.SESSIONS, sessions);
}

export function getSessionById(sessionId) {
  return getAllSessions().find((s) => s.id === sessionId) ?? null;
}
