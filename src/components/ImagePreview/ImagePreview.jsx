import './ImagePreview.less';

export default function ImagePreview({ src, alt = 'Uploaded technique preview', hasSkeletonOverlay = false }) {
  if (!src) return null;

  return (
    <figure className={`image-preview ${hasSkeletonOverlay ? 'image-preview--analyzed' : ''}`}>
      <div className="image-preview__frame">
        <img 
          src={src} 
          alt={alt} 
          className="image-preview__source-img"
        />
        
        {/* If posture analysis metadata exists, show structural overlay context tracker */}
        {hasSkeletonOverlay && (
          <div className="image-preview__analysis-overlay" aria-hidden="true">
            <div className="image-preview__vector-pulse"></div>
          </div>
        )}
      </div>
      <figcaption className="visually-hidden">{alt}</figcaption>
    </figure>
  );
}