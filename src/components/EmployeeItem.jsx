export default function EmployeeItem({ employee, onSelect }) {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect();
    }
  };

  return (
    <li
      className="employee-item"
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
      aria-label={`Open details for ${employee.name}`}
    >
      <img src={employee.image} alt={employee.name} className="employee-avatar" />
      <span className="employee-summary">
        <span className="item-name">{employee.name}</span>
        <span className="item-position">{employee.position}</span>
      </span>
    </li>
  );
}
