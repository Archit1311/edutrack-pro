import './KpiCard.css';

export default function KpiCard({
  icon,
  iconBg = 'primary-fixed', // 'primary-fixed', 'secondary-container', 'error-container', 'tertiary-fixed'
  label,
  value,
  subtext,
  trend, // { direction: 'up' | 'down' | 'flat', text: string }
  progress, // number 0-100
  onClick,
}) {
  const getIconBgStyle = () => {
    switch (iconBg) {
      case 'secondary-container':
        return { backgroundColor: 'var(--color-secondary-container)', color: 'var(--color-on-secondary-container)' };
      case 'error-container':
        return { backgroundColor: 'var(--color-error-container)', color: 'var(--color-on-error-container)' };
      case 'tertiary-fixed':
        return { backgroundColor: 'rgba(111, 251, 190, 0.25)', color: 'var(--color-on-tertiary-fixed-variant)' };
      case 'primary-fixed':
      default:
        return { backgroundColor: 'var(--color-primary-fixed)', color: 'var(--color-on-primary-fixed)' };
    }
  };

  return (
    <div
      className={`kpi-card card ${onClick ? 'kpi-card--clickable' : ''}`}
      onClick={onClick}
    >
      <div className="kpi-card__header">
        <div className="kpi-card__icon" style={getIconBgStyle()}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <span className="kpi-card__label text-label-caps">{label}</span>
      </div>

      <div className="kpi-card__value text-display-lg">{value}</div>

      {progress !== undefined && (
        <div className="kpi-card__progress">
          <div className="progress-track progress-track--sm">
            <div
              className={`progress-fill ${progress < 75 ? 'progress-fill--warning' : ''}`}
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
        </div>
      )}

      {trend && (
        <div className="kpi-card__trend">
          <span className={`material-symbols-outlined ${trend.direction === 'down' ? 'text-error' : trend.direction === 'up' ? 'text-tertiary-dim' : 'text-secondary'}`}>
            {trend.direction === 'up' ? 'trending_up' : trend.direction === 'down' ? 'trending_down' : 'trending_flat'}
          </span>
          <span className={`kpi-card__trend-text ${trend.direction === 'down' ? 'text-error' : ''}`}>
            {trend.text}
          </span>
        </div>
      )}

      {subtext && <div className="kpi-card__subtext text-body-sm text-on-surface-variant">{subtext}</div>}
    </div>
  );
}
