import { getClientTierLabel, getClientTierValue } from '../clientTiers';

export default function ClientItem({ client, onSelect }) {
  const clientType = client.type.toLowerCase();
  const clientTier = getClientTierValue(client);
  const clientTierLabel = getClientTierLabel(client);

  return (
    <li className={`list-item client-item ${clientType} ${clientTier}`}>
      <button className="client-detail-button" onClick={() => onSelect(client)}>
        <span>{client.name}</span>
        <span className="client-badges">
          <span className={`client-type-badge ${clientType}`}>{client.type}</span>
          {/* {clientTier && <span className={`client-tier-badge ${clientTier}`}>{clientTierLabel}</span>} */}
        </span>
      </button>
    </li>
  );
}
