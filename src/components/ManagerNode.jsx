import DropdownToggle from './DropdownToggle';
import PersonSummary from './PersonSummary';

export default function ManagerNode({
  manager,
  employeesExpanded,
  clientsExpanded,
  onToggleEmployees,
  onToggleClients,
}) {
  return (
    <div className="manager-node">
      <div className="manager-node-details">
        <PersonSummary person={manager} />
      </div>

      <div className="dropdown-actions">
        {manager.employees.length > 0 && (
          <DropdownToggle
            controlsId={`employees-${manager.id}`}
            isExpanded={employeesExpanded}
            onClick={onToggleEmployees}
          >
            Engineers
          </DropdownToggle>
        )}

        {manager.clients.length > 0 && (
          <DropdownToggle
            className="clients-toggle"
            controlsId={`clients-${manager.id}`}
            isExpanded={clientsExpanded}
            onClick={onToggleClients}
          >
            Clients
          </DropdownToggle>
        )}
      </div>
    </div>
  );
}
