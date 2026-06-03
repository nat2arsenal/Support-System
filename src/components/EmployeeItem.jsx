export default function EmployeeItem({ employee }) {
  return (
    <li className="employee-item">
      <img src={employee.image} alt={employee.name} className="employee-avatar" />
      <span className="employee-summary">
        <span className="item-name">{employee.name}</span>
        <span className="item-position">{employee.position}</span>
      </span>
    </li>
  );
}
