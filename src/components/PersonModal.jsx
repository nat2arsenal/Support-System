import ClientItem from './ClientItem';

export default function PersonModal({ onClose, onSelectClient, person }) {
  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="person-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="person-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close person details">
          x
        </button>

        <div className="person-modal-header">
          <img src={person.image} alt={person.name} className="person-modal-image" />
          <div className="person-modal-summary">
            <span className="person-role-label">{person.roleLabel}</span>
            <h2 id="person-modal-title">{person.name}</h2>
            <p>{person.position}</p>
          </div>
        </div>

        <div className="client-detail-section">
          <h3>Associated Clients</h3>
          <ul className="items-list person-client-list">
            {person.clients.map((client, index) => (
              <ClientItem
                key={`${client.id}-${client.name}-${index}`}
                client={client}
                onSelect={onSelectClient}
              />
            ))}

            {person.clients.length === 0 && (
              <li className="empty-list-item">No associated clients found.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
