import './Skeleton.less';

export default function Skeleton({
  count = 3,
  type = 'text',
  width = '100%',
  height = '1.5rem',
}) {
  if (type === 'card') {
    return (
      <div className="skeleton-card">
        <div className="skeleton-card__header" />
        <div className="skeleton-card__body">
          <div className="skeleton-line skeleton-line--xl" style={{ width: '40%' }} />
          <div className="skeleton-line" style={{ width: '100%' }} />
          <div className="skeleton-line" style={{ width: '85%' }} />
          <div className="skeleton-line skeleton-line--sm" style={{ width: '60%' }} />
        </div>
      </div>
    );
  }

  if (type === 'image') {
    return <div className="skeleton-image" />;
  }

  if (type === 'feedback') {
    return (
      <div className="skeleton-feedback">
        <div className="skeleton-feedback__title" />
        <div className="skeleton-feedback__item" style={{ width: '100%' }} />
        <div className="skeleton-feedback__item" style={{ width: '92%' }} />
        <div className="skeleton-feedback__item" style={{ width: '78%' }} />
        <div className="skeleton-feedback__footer" />
      </div>
    );
  }

  return (
    <div className="skeleton-group">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="skeleton-line"
          style={{ width, height }}
        />
      ))}
    </div>
  );
}