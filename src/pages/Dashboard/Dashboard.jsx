import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import FeedbackCard from '../../components/FeedbackCard/FeedbackCard.jsx';
import ImagePreview from '../../components/ImagePreview/ImagePreview.jsx';
import Skeleton from '../../components/Skeleton/Skeleton.jsx';
import ScoreChart from '../../components/ScoreChart/ScoreChart.jsx';
import UploadCard from '../../components/UploadCard/UploadCard.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import { analyzeTechnique } from '../../services/ai/index.js';
import { fileToBase64 } from '../../utils/fileToBase64.js';
import { getSessionsForUser, saveSession } from '../../services/storage.js';
import { parseFeedback } from '../../utils/feedback.js';
import './Dashboard.less';
import { FEEDBACK_TITLE, FEEDBACK_DESCRIPTION } from '../../utils/constants.js';

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function Dashboard() {
  const { user } = useAuth();
  const [preview, setPreview] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [fileMeta, setFileMeta] = useState({ name: '', size: '' });

  const [sessions, setSessions] = useState(() => getSessionsForUser(user.id));

  const handleFileSelect = async (file) => {
    setUploadError('');
    setError('');
    setFeedback(null);

    if (!file) {
      setPreview(null);
      setImageData(null);
      setFileMeta({ name: '', size: '' });
      return;
    }

    if (!file.type.startsWith('image/')) {
      setUploadError('Please upload a JPG or PNG image.');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setUploadError('Image must be 5 MB or smaller.');
      return;
    }

    setFileMeta({
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
    });

    try {
      const data = await fileToBase64(file);
      setPreview(data.preview);
      setImageData(data);
    } catch {
      setUploadError('Could not read the image. Try another file.');
    }
  };

  const handleClearImage = () => {
    setPreview(null);
    setImageData(null);
    setFeedback(null);
    setFileMeta({ name: '', size: '' });
    setError('');
  };

  const handleAnalyze = async () => {
    if (!imageData) {
      setUploadError('Choose an image before analyzing.');
      return;
    }

    setLoading(true);
    setError('');
    setFeedback(null);

    try {
      const raw = await analyzeTechnique(imageData.base64, imageData.mimeType, user);
      const parsed = parseFeedback(raw);
      setFeedback(parsed);

      saveSession({
        id: uuidv4(),
        userId: user.id,
        image: imageData.preview,
        date: new Date().toISOString(),
        feedback: parsed,
        chatMessages: [],
      });
      setSessions(getSessionsForUser(user.id));
    } catch (err) {
      setError(err.message || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">

      {/* 1. ACCENTED HEADER */}
      <header className="dashboard__header">
        <h1 className="dashboard__greeting">Welcome, {user.name}</h1>
        <ul className="dashboard__meta-list">
          <li className="dashboard__meta-item">{user.role}</li>
          <li className="dashboard__meta-item">{user.level}</li>
          <li className="dashboard__meta-item">{user.sport}</li>
        </ul>
      </header>

      {/* 2. CORE ROW WORKING LAYOUT GRID */}
      <div className="dashboard__workspace-grid">

        {/* LEFT MODULE PANEL CHASSIS */}
        <div className="dashboard__panel">
          {!preview ? (
            <UploadCard
              preview={preview}
              onFileSelect={handleFileSelect}
              disabled={loading}
              error={uploadError}
            />
          ) : (
            <div className="dashboard__panel-content dashboard__panel-content--preview">

              {/* Steps Workflow Tracker */}
              <div className="dashboard__stepper">
                <span className="dashboard__step dashboard__step--completed">✓ 1. Uploaded</span>
                <span className="dashboard__step-connector" />
                <span className={`dashboard__step ${feedback ? 'dashboard__step--completed' : 'dashboard__step--active'}`}>
                  {loading ? '⚡ Analyzing...' : feedback ? '✓ 2. Analyzed' : '2. Ready'}
                </span>
              </div>

              {/* Bounded Scaled Media Wrapper */}
              <div className="dashboard__image-frame">
                <img src={preview} alt="Stance Source Analysis Preview" />
              </div>

              {/* File Info Metrics */}
              <div className="dashboard__file-meta">
                <div className="dashboard__meta-row">
                  <span className="dashboard__meta-label">File Name</span>
                  <span className="dashboard__meta-value dashboard__meta-value--truncate">{fileMeta.name}</span>
                </div>
                <div className="dashboard__meta-row">
                  <span className="dashboard__meta-label">File Size</span>
                  <span className="dashboard__meta-value">{fileMeta.size}</span>
                </div>
              </div>

              {/* Bottom Action Cluster */}
              <div className="dashboard__action-cluster">
                {!feedback ? (
                  <button
                    type="button"
                    className="btn btn--primary dashboard__btn-submit"
                    onClick={handleAnalyze}
                    disabled={loading || !preview}
                  >
                    {loading ? 'Processing...' : 'Analyze Stance'}
                  </button>
                ) : (
                  <button
                    type="button"
                    className="dashboard__btn-completed"
                    disabled={true}
                  >
                    ✓ Analyzed Stance
                  </button>
                )}

                <button
                  type="button"
                  className="dashboard__btn-clear"
                  onClick={handleClearImage}
                  disabled={loading}
                >
                  Remove
                </button>
              </div>

            </div>
          )}
        </div>

        {/* RIGHT MODULE PANEL CHASSIS */}
        <div className="dashboard__panel">
          <div className={`dashboard__report-scroll-box ${loading ? 'dashboard__report-scroll-box--loading' : ''}`}>
            {loading ? (
              <div className="dashboard__loading">
                <Skeleton type="feedback" />
              </div>
            ) : feedback ? (
              <FeedbackCard feedback={feedback} />
            ) : (
              <div className="dashboard__empty-wrapper">
                <div className="dashboard__empty-icon">🎯</div>
                <h3 className="dashboard__empty-title">{FEEDBACK_TITLE}</h3>
                <p className="dashboard__empty-text">{FEEDBACK_DESCRIPTION}</p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* 3. CORE REPORT CHARTS SYSTEM TRACKER */}
      <footer className="dashboard__analytics-footer">
        <ScoreChart sessions={sessions} />
      </footer>
    </div>
  );
}