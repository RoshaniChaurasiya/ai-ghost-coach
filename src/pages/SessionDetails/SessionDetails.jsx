import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import ChatBox from '../../components/ChatBox/ChatBox.jsx';
import FeedbackCard from '../../components/FeedbackCard/FeedbackCard.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import { askCoachFollowUp } from '../../services/ai/index.js';
import { getSessionById, saveSession } from '../../services/storage.js';
import './SessionDetails.less';
import { CHATBOX_TEXT } from '../../utils/constants.js';

export default function SessionDetails() {
  const { sessionId } = useParams();
  const { user } = useAuth();
  const [session, setSession] = useState(() => getSessionById(sessionId));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [shareStatus, setShareStatus] = useState('Share Session Metrics');

  if (!session || session.userId !== user.id) {
    return <Navigate to="/history" replace />;
  }

  const messages = session.chatMessages ?? [];

  // Native Mobile System Tray Share + Desktop Clipboard Fallback Engine
  const handleShareSession = async () => {
    const shareData = {
      title: 'Ghost Coach - Stance Feedback Report',
      text: `Check out my ${user.sport || 'Badminton'} movement mechanics evaluation score: ${session.feedback?.overallScore || 'N/A'}/10!`,
      url: window.location.href,
    };

    // If native device browser share controllers are accessible, call them directly
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        if (err.name === 'AbortError') return;
      }
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareStatus('📋 Link Copied!');
      setTimeout(() => setShareStatus('Share Session Metrics'), 2500); 
    } catch {
      setError('Could not access clipboard data hooks automatically.');
    }
  };

  const handleSend = async (question) => {
    setLoading(true);
    setError('');

    const userMessage = {
      id: uuidv4(),
      role: 'user',
      text: question,
      date: new Date().toISOString(),
    };

    const withUser = {
      ...session,
      chatMessages: [...messages, userMessage],
    };
    setSession(withUser);
    saveSession(withUser);

    try {
      const reply = await askCoachFollowUp(session.feedback, question, user);
      const coachMessage = {
        id: uuidv4(),
        role: 'coach',
        text: reply.trim(),
        date: new Date().toISOString(),
      };
      const updated = {
        ...withUser,
        chatMessages: [...withUser.chatMessages, coachMessage],
      };
      setSession(updated);
      saveSession(updated);
    } catch (err) {
      setError(err.message || 'Could not get a response. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const dateLabel = new Date(session.date).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <div className="session-details-page page">
      
      {/* ==========================================================================
         1. BREADCRUMBS LINK ROUTING MATRIX
         ========================================================================== */}
      <nav className="session-details-page__breadcrumbs" aria-label="Breadcrumb navigation">
        <Link to="/history" className="session-details-page__breadcrumb-link">History</Link>
        <span className="session-details-page__breadcrumb-divider" aria-hidden="true"> / </span>
        <span className="session-details-page__breadcrumb-current" aria-current="page">Session details</span>
      </nav>

      <header className="session-details-page__header">
        <h1 className="session-details-page__title">Session details</h1>
      </header>

      {/* ==========================================================================
         2. CORE WORKSPACE COLUMNS GRID (Symmetric View Anchors)
         ========================================================================== */}
      <div className="session-details-page__grid">
        
        {/* LEFT COLUMN PILLAR INTERFACES (Pined Sticky Context) */}
        <aside className="session-details-page__sticky-column">
          
          {/* Main Media Core Chassis Frame */}
          <div className="session-details-page__media-card">
            <div className="session-details-page__image-frame">
              <img src={session.image} className="session-details-page__blur-backdrop" alt="" aria-hidden="true" />
              <img src={session.image} className="session-details-page__source-img" alt="Player body alignment evaluation posture" />
            </div>

            {/* Static Content Data Row Items */}
            <div className="session-details-page__meta-panel">
              <div className="session-details-page__meta-row">
                <span className="session-details-page__meta-label">Analyzed Date</span>
                <span className="session-details-page__meta-value">{dateLabel}</span>
              </div>
              <div className="session-details-page__meta-row">
                <span className="session-details-page__meta-label">Target Sport</span>
                <span className="session-details-page__meta-value">{user.sport || 'Badminton'}</span>
              </div>
              <div className="session-details-page__meta-row">
                <span className="session-details-page__meta-label">Player Position</span>
                <span className="session-details-page__meta-value">{user.role || 'Player'}</span>
              </div>
            </div>
          </div>

          {/* DYNAMIC ACTION MANAGEMENT BLOCK */}
          <div className="session-details-page__actions-card">
            <h3 className="session-details-page__actions-title">Session Management</h3>
            <div className="session-details-page__actions-list">
              <button type="button" className="session-details-page__action-button" onClick={() => window.print()}>
                <span>📊</span> Export Analysis Report (PDF)
              </button>
              
              <button type="button" className="session-details-page__action-button" onClick={handleShareSession}>
                <span>🔗</span> {shareStatus}
              </button>
              
              <Link to="/dashboard" className="session-details-page__action-button" style={{ textDecoration: 'none' }}>
                <span>🔄</span> Upload alternative stance
              </Link>
            </div>
          </div>

        </aside>

        {/* RIGHT COLUMN STACK (Scrollable AI Insights Output Stream) */}
        <main className="session-details-page__reports-column">
          <FeedbackCard feedback={session.feedback} />
        </main>
        
      </div>

      {/* ==========================================================================
         3. CONSOLE FALLBACK ERRORS BANNER OVERLAYS
         ========================================================================== */}
      {error && (
        <div className="session-details-page__error-banner" role="alert">
          <span className="session-details-page__error-icon" aria-hidden="true">⚠️</span> {error}
        </div>
      )}

      {/* ==========================================================================
         4. CORE CONVERSATIONAL AI COACH INTERACTIVE HUD
         ========================================================================== */}
      <footer className="session-details-page__chat-section">
        <h2 className="session-details-page__chat-title">{CHATBOX_TEXT.title}</h2>
        <p className="session-details-page__chat-subtitle">{CHATBOX_TEXT.subtitle}</p>
        <ChatBox
          messages={messages}
          onSend={handleSend}
          loading={loading}
          disabled={!session.feedback}
        />
      </footer>

    </div>
  );
}