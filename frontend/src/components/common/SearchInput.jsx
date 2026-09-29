export default function SearchInput({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
  style = {},
}) {
  return (
    <div className={`search-input-wrapper ${className}`} style={style}>
      <span className="material-symbols-outlined search-input-icon">search</span>
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
