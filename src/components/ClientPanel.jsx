import ClientItem from './ClientItem';
import DropdownPanel from './DropdownPanel';
import { clientTierOptions } from '../clientTiers';

const clientTypeOptions = [
  { value: 'All', label: 'All' },
  { value: 'Recurring', label: 'Recurring' },
  { value: 'Prepaid', label: 'Prepaid' },
];

export default function ClientPanel({
  clients,
  clientTierFilter,
  clientTypeFilter,
  manager,
  onClientTierChange,
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

      <div
        className="client-filter-group"
        role="group"
        aria-label={`Filter clients for ${manager.name} by type`}
      >
        {clientTypeOptions.map((type) => (
          <button
            key={type.value}
            type="button"
            className={`filter-chip ${clientTypeFilter === type.value ? 'active' : ''} ${type.value.toLowerCase()}`}
            onClick={() => onClientTypeChange(type.value)}
          >
            {type.label}
          </button>
        ))}
      </div>

      <div
        className="client-filter-group tier-filter-group"
        role="group"
        aria-label={`Filter clients for ${manager.name} by tier`}
      >
        {clientTierOptions.map((tier) => (
          <button
            key={tier.value}
            type="button"
            className={`filter-chip tier-chip ${clientTierFilter === tier.value ? 'active' : ''} ${clientTierFilter === 'All' ? 'all-tiers' : ''}`}
            style={tier.color ? { '--tier-color': tier.color } : undefined}
            onClick={() => onClientTierChange(tier.value)}
          >
            {tier.color && <span className="tier-dot" aria-hidden="true"></span>}
            {tier.shortLabel}
          </button>
        ))}
      </div>

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
