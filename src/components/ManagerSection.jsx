import ClientPanel from './ClientPanel';
import EmployeePanel from './EmployeePanel';
import ManagerNode from './ManagerNode';
import { getClientTierValue } from '../clientTiers';

const getFilteredEmployees = (employees, searchQuery) => {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(normalizedQuery) ||
      employee.position.toLowerCase().includes(normalizedQuery),
  );
};

const getFilteredClients = (clients, searchQuery, typeFilter, tierFilter) => {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return clients
    .filter((client) => {
      const matchesSearch = client.name.toLowerCase().includes(normalizedQuery);
      const matchesType = typeFilter === 'All' || client.type === typeFilter;
      const matchesTier = tierFilter === 'All' || getClientTierValue(client) === tierFilter;

      return matchesSearch && matchesType && matchesTier;
    })
    .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
};

export default function ManagerSection({
  activeSection,
  clientSearch,
  clientTierFilter,
  clientTypeFilter,
  employeeSearch,
  manager,
  onClientTierChange,
  onClientSearchChange,
  onClientTypeChange,
  onEmployeeSearchChange,
  onSelectEmployee,
  onSelectClient,
  onSelectManager,
  onToggleSection,
}) {
  const employeesExpanded = activeSection === 'employees';
  const clientsExpanded = activeSection === 'clients';
  const filteredEmployees = getFilteredEmployees(manager.employees, employeeSearch);
  const filteredClients = getFilteredClients(
    manager.clients,
    clientSearch,
    clientTypeFilter,
    clientTierFilter,
  );

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
            clientTierFilter={clientTierFilter}
            clientTypeFilter={clientTypeFilter}
            manager={manager}
            onClientTierChange={onClientTierChange}
            searchQuery={clientSearch}
            onClientTypeChange={onClientTypeChange}
            onSearchChange={onClientSearchChange}
            onSelectClient={onSelectClient}
          />
        )}
      </div>
    </div>
  );
}
