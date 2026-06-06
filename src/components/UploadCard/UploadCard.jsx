import { useRef } from 'react';
import './UploadCard.less';
import { UPLOAD_CARD_TEXT } from '../../utils/constants';

export default function UploadCard({ onFileSelect, disabled, error }) {
  const fileInputRef = useRef(null);

  const handleTriggerSelect = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  return (
    <div className="upload-card">
      <div className="upload-card__container">
        <div className="upload-card__art-icon" aria-hidden="true">📸</div>
        
        <h2 className="upload-card__title">{UPLOAD_CARD_TEXT.title}</h2>
        <p className="upload-card__description">
          {UPLOAD_CARD_TEXT.subtitle}
          <span className="upload-card__hint">{UPLOAD_CARD_TEXT.description}</span>
        </p>

        <input
          type="file"
          ref={fileInputRef}
          className="visually-hidden"
          accept="image/jpeg, image/png"
          onChange={(e) => onFileSelect(e.target.files[0])}
          disabled={disabled}
        />

        <button
          type="button"
          className="btn btn--primary upload-card__btn"
          onClick={handleTriggerSelect}
          disabled={disabled}
        >
          Choose file
        </button>

        {error && <p className="upload-card__error-banner" role="alert">⚠️ {error}</p>}
      </div>
    </div>
  );
}