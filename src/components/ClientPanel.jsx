import ClientItem from './ClientItem';
import ClientFilterDropdown from './ClientFilterDropdown';
import DropdownPanel from './DropdownPanel';

export default function ClientPanel({
  clients,
  clientFilters,
  manager,
  onClientFiltersChange,
  onSearchChange,
  onSelectClient,
  searchQuery,
}) {
  return (
    <DropdownPanel id={`clients-${manager.id}`}>
      <h4 className="section-title clients-title">Clients</h4>
      <input
        id="dropdown-search"
        className="dropdown-search"
        type="search"
        placeholder="Search for a client"
        value={searchQuery}
        onChange={(event) => onSearchChange(event.target.value)}
      />

      <ClientFilterDropdown
        ariaLabel={`Open client filters for ${manager.name}`}
        filteredClientCount={clients.length}
        filters={clientFilters}
        onChange={onClientFiltersChange}
      />

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
