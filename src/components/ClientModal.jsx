import { getClientTierLabel } from '../clientFilters';

export default function ClientModal({ client, onClose }) {
  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="client-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="client-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close client details">
          x
        </button>
        {client.coreServices?.length && client.coreServices.includes('Service Desk') && (
          <div className="service-desk-indicator" title="Service Desk"></div>
        )}
        {client.fullCompanyName && client.fullCompanyName !== '' ? (
          <h2 id="client-modal-title">{client.fullCompanyName}</h2>
        ) : (
          <h2 id="client-modal-title">{client.name}</h2>
        )}

        <div className="client-detail-section">
          <h3>Client Type</h3>
          <p>{client.type}</p>
        </div>

        <div className="client-detail-section">
          <h3>Tier</h3>
          <p>{getClientTierLabel(client)}</p>
        </div>

        <div className="client-detail-section">
          <h3>Hours Purchased</h3>
          <p>{client.hoursPurchased}</p>
        </div>

        <div className="client-detail-section">
          <h3>Core Services</h3>
          <ul>
            {client.coreServices.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </div>

        <div className="client-detail-section">
          <h3>Engineering Team</h3>
          <ul>
            {client.engineeringTeam.map((member) => (
              <li key={member}>{member}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
