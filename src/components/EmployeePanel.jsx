import DropdownPanel from './DropdownPanel';
import EmployeeItem from './EmployeeItem';

export default function EmployeePanel({
  employees,
  managerId,
  onSearchChange,
  onSelectEmployee,
  searchQuery,
}) {
  return (
    <DropdownPanel id={`employees-${managerId}`}>
      <h4 className="section-title">Engineers</h4>
      <input
        className="dropdown-search"
        type="search"
        placeholder="Search for an engineer"
        value={searchQuery}
        onChange={(event) => onSearchChange(event.target.value)}
      />      
      <ul className="items-list">
        {employees.map((employee) => (
          <EmployeeItem
            key={employee.id}
            employee={employee}
            onSelect={() => onSelectEmployee(employee)}
          />
        ))}

        {employees.length === 0 && <li className="empty-list-item">No engineers found.</li>}
      </ul>
    </DropdownPanel>
  );
}
