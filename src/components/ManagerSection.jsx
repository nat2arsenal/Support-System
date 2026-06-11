import ClientPanel from './ClientPanel';
import EmployeePanel from './EmployeePanel';
import ManagerNode from './ManagerNode';
import { filterClients } from '../clientFilters';

const getFilteredEmployees = (employees, searchQuery) => {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(normalizedQuery) ||
      employee.position.toLowerCase().includes(normalizedQuery),
  );
};

export default function ManagerSection({
  activeSection,
  clientFilters,
  clientSearch,
  employeeSearch,
  manager,
  onClientFiltersChange,
  onClientSearchChange,
  onEmployeeSearchChange,
  onSelectEmployee,
  onSelectClient,
  onSelectManager,
  onToggleSection,
}) {
  const employeesExpanded = activeSection === 'employees';
  const clientsExpanded = activeSection === 'clients';
  const filteredEmployees = getFilteredEmployees(manager.employees, employeeSearch);
  const filteredClients = filterClients(manager.clients, clientSearch, clientFilters);

  return (
    <div className="manager-section">
      <div className="vertical-connector"></div>

      <ManagerNode
        manager={manager}
        employeesExpanded={employeesExpanded}
        clientsExpanded={clientsExpanded}
        onToggleEmployees={() => onToggleSection(manager.id, 'employees')}
        onToggleClients={() => onToggleSection(manager.id, 'clients')}
        onSelectPerson={onSelectManager}
      />

      <div className="dropdown-panels">
        {employeesExpanded && (
          <EmployeePanel
            employees={filteredEmployees}
            managerId={manager.id}
            searchQuery={employeeSearch}
            onSelectEmployee={onSelectEmployee}
            onSearchChange={onEmployeeSearchChange}
          />
        )}

        {clientsExpanded && (
          <ClientPanel
            clients={filteredClients}
            clientFilters={clientFilters}
            manager={manager}
            onClientFiltersChange={onClientFiltersChange}
            searchQuery={clientSearch}
            onSearchChange={onClientSearchChange}
            onSelectClient={onSelectClient}
          />
        )}
      </div>
    </div>
  );
}
