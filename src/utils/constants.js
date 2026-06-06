export const APP_NAME = 'Ghost Coach';

export const APP_TAGLINE = 'Sign in to analyze your technique'; 

export const APP_DESCRIPTION = 'Tell us about your sport so AI feedback is tailored to you.';

export const STORAGE_KEYS = {
  USERS: 'ghost_coach_users',
  CURRENT_USER: 'ghost_coach_current_user',
  SESSIONS: 'ghost_coach_sessions',
};

export const SPORTS = ['Cricket', 'Football', 'Basketball', 'Badminton'];

export const SPORT_ROLES = {
  Cricket: ['Batsman', 'Bowler', 'All-Rounder', 'Wicket-Keeper'],
  Football: ['Forward', 'Midfielder', 'Defender', 'Goalkeeper'],
  Basketball: ['Point Guard', 'Shooting Guard', 'Small Forward', 'Power Forward', 'Center'],
  Badminton: ['Singles', 'Doubles', 'Mixed Doubles'],
};

export const EXPERIENCE_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

export const SPORT_CONTEXT = {
  Cricket: "batting, bowling, fielding, stance, grip",
  Football: "dribbling, passing, shooting, positioning",
  Basketball: "shooting form, dribbling, defense, footwork",
  Badminton: "racket grip, smash, footwork, balance",
};

export const FEEDBACK_TITLE = 'AI Coaching Feedback Report';
export const FEEDBACK_DESCRIPTION = 'Your complete analysis metrics, posture adjustments, and targeted badminton training drills will populate right here once analysis begins.';

export const FEEDBACK_SCHEMA = {
  overallScore: '',
  strengths: [],
  areasToImprove: [],
  priorityFix: '',
  drillSuggestion: '',
  confidenceLevel: '',
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  HISTORY: '/history',
  SESSION: '/history/:sessionId',
};

export const CHATBOX_TEXT = {
  title: 'Ask your AI coach',
  subtitle: 'Follow-up questions use your session feedback for context.',
  empty: 'Example: "How can I improve my footwork?"',
  placeholder: 'How can I improve my footwork?',
  send: 'Send',
  userLabel: 'You',
  coachLabel: 'Coach'
};

export const FEEDBACK_TEXT = {
  title: 'Technique report',
  scoreLabel: 'Score',
  strengths: 'Strengths',
  improvements: 'Areas to improve',
  priorityFix: 'Priority fix',
  drill: 'Suggested drill',
  confidenceLabel: 'Analysis confidence:'
};

export const HISTORY_TEXT = {
  title: 'Session history',
  subtitle: 'Review past analyses and continue coaching conversations.',
  emptyTitle: 'No sessions yet',
  emptyText: 'Your analyzed images and feedback will appear here.',
  cta: 'Go to dashboard'
};

export const GEMINI_MODEL = 'gemini-2.5-flash';

export const CONFIDENCE_LEVELS = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
};

export const THEME_STORAGE_KEY = 'ghost-coach-theme';
export const THEMES = {
  light: 'light',
  dark: 'dark',
};

export const UPLOAD_CARD_TEXT = {
   title: 'Upload stance image',
   subtitle: 'Drag and drop your stance photo here, or browse local files',
   description: 'Supports JPG or PNG format up to 5 MB. Ensure a clear side or front perspective of your body position.'
};