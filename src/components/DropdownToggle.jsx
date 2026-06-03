export default function DropdownToggle({
  children,
  className = '',
  controlsId,
  isExpanded,
  onClick,
}) {
  return (
    <button
      className={`dropdown-toggle ${className} ${isExpanded ? 'expanded' : ''}`.trim()}
      onClick={onClick}
      aria-expanded={Boolean(isExpanded)}
      aria-controls={controlsId}
    >
      <span>{children}</span>
      <span className="toggle-icon">v</span>
    </button>
  );
}
