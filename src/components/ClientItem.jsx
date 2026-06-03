export default function ClientItem({ client, onSelect }) {
  const clientType = client.type.toLowerCase();
  const clientTier = client.tier.toLowerCase();

  return (
    <li className={`list-item client-item ${clientType} ${clientTier}`}>
      <button className="client-detail-button" onClick={() => onSelect(client)}>
        <span>{client.name}</span>
        <span className={`client-type-badge ${clientType}`}>{client.type}</span>
      </button>
    </li>
  );
}
