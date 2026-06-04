export const clientTierOptions = [
  { value: 'All', label: 'All tiers', shortLabel: 'All' },
  { value: 'tier-a', label: 'Tier A', shortLabel: 'A', color: '#93C47D' },
  { value: 'tier-b', label: 'Tier B', shortLabel: 'B', color: '#FFAD58' },
  { value: 'tier-c', label: 'Tier C', shortLabel: 'C', color: '#FFD966' },
  { value: 'tier-d', label: 'Tier D', shortLabel: 'D', color: '#BA6A5A' },
];

export const getClientTierValue = (client) => (client.tier ?? '').toLowerCase();

export const getClientTierLabel = (client) => {
  const tier = clientTierOptions.find((option) => option.value === getClientTierValue(client));

  return tier?.label ?? 'Unassigned';
};
