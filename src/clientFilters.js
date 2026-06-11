export const defaultClientFilters = {
  type: 'All',
  tier: 'All',
  serviceDesk: 'All',
};

export const clientTierOptions = [
  { value: 'All', label: 'All tiers', shortLabel: 'All Tiers' },
  { value: 'tier-a', label: 'Tier A', shortLabel: 'A', color: '#93C47D' },
  { value: 'tier-b', label: 'Tier B', shortLabel: 'B', color: '#FFAD58' },
  { value: 'tier-c', label: 'Tier C', shortLabel: 'C', color: '#FFD966' },
  { value: 'tier-d', label: 'Tier D', shortLabel: 'D', color: '#BA6A5A' },
];

export const clientTypeOptions = [
  { value: 'All', label: 'All Types' },
  { value: 'Recurring', label: 'Recurring', className: 'recurring' },
  { value: 'Prepaid', label: 'Prepaid', className: 'prepaid' },
];

export const serviceDeskOptions = [
  { value: 'All', label: 'All Services' },
  { value: 'Service Desk', label: 'Service Desk' },
];

export const hasServiceDesk = (client) =>
  client.coreServices?.some((service) => service.toLowerCase() === 'service desk') ?? false;

export const getClientTierValue = (client) => (client.tier ?? '').toLowerCase();

export const getClientTierLabel = (client) => {
  const tier = clientTierOptions.find((option) => option.value === getClientTierValue(client));

  return tier?.label ?? 'Unassigned';
};

export const filterClients = (clients, searchQuery, filters) => {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return clients
    .filter((client) => {
      const matchesSearch = client.name.toLowerCase().includes(normalizedQuery);
      const matchesType = filters.type === 'All' || client.type === filters.type;
      const matchesTier = filters.tier === 'All' || getClientTierValue(client) === filters.tier;
      const matchesServiceDesk =
        filters.serviceDesk === 'All' || hasServiceDesk(client);

      return matchesSearch && matchesType && matchesTier && matchesServiceDesk;
    })
    .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
};
