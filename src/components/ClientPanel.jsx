import ClientItem from './ClientItem';
import DropdownPanel from './DropdownPanel';

const clientTypeOptions = ['All', 'Recurring', 'Prepaid'];

export default function ClientPanel({
  clients,
  clientTypeFilter,
  manager,
  onClientTypeChange,
  onSearchChange,
  onSelectClient,
  searchQuery,
}) {
  return (
    <DropdownPanel id={`clients-${manager.id}`}>
      <h4 className="section-title clients-title">Clients</h4>
      <input
        className="dropdown-search"
        type="search"
        placeholder="Search for a client"
        value={searchQuery}
        onChange={(event) => onSearchChange(event.target.value)}
      />
      <select
        className="dropdown-filter"
        value={clientTypeFilter}
        onChange={(event) => onClientTypeChange(event.target.value)}
        aria-label={`Filter clients for ${manager.name} by type`}
      >
        {clientTypeOptions.map((type) => (
          <option key={type} value={type}>
            {type === 'All' ? 'All client types' : type}
          </option>
        ))}
      </select>      
      <ul className="items-list">
        {clients.map((client, index) => (
          <ClientItem
            key={`${client.id}-${client.name}-${index}`}
            client={client}
            onSelect={onSelectClient}
          />
        ))}

        {clients.length === 0 && <li className="empty-list-item">No clients found.</li>}
      </ul>
    </DropdownPanel>
  );
}
