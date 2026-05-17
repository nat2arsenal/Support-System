import { useState } from 'react';
import './OrganizationChart.css';

const organizationData = {
  director: {
    id: 1,
    name: 'John Smith',
    position: 'Director',
    company: 'Tech Corp',
    image: '../public/placeholder-image-person.webp',
  },
  managers: [
    {
      id: 2,
      name: 'Sarah Johnson',
      position: 'Manager',
      company: 'Tech Corp',
      image: '../public/placeholder-image-person.webp',
      employees: [
        { id: 4, name: 'Alice Brown', position: 'Senior Developer' },
        { id: 5, name: 'Bob Wilson', position: 'QA Engineer' },
        { id: 6, name: 'Carol Davis', position: 'UI Designer' },
      ],
      clients: [
        {
          id: 101,
          name: 'Client A Inc.',
          invoiceText: 'Monthly managed support and platform maintenance retainer.',
          coreServices: ['Application Support', 'Cloud Monitoring', 'QA Regression'],
          engineeringTeam: ['Alice Brown', 'Bob Wilson'],
        },
        {
          id: 102,
          name: 'Client B Solutions',
          invoiceText: 'Sprint-based product engineering and UI enhancement services.',
          coreServices: ['Frontend Development', 'UI Design', 'Release Support'],
          engineeringTeam: ['Alice Brown', 'Carol Davis'],
        },
      ],
    },
    {
      id: 3,
      name: 'Michael Chen',
      position: 'Manager',
      company: 'Tech Corp',
      image: '../public/placeholder-image-person.webp',
      employees: [
        { id: 7, name: 'David Miller', position: 'Backend Developer' },
        { id: 8, name: 'Emma Taylor', position: 'DevOps Engineer' },
      ],
      clients: [
        {
          id: 103,
          name: 'Client C Global',
          invoiceText: 'Backend modernization, API maintenance, and incident response.',
          coreServices: ['API Development', 'Database Optimization', 'Incident Response'],
          engineeringTeam: ['David Miller', 'Emma Taylor'],
        },
        {
          id: 104,
          name: 'Client D Tech',
          invoiceText: 'Infrastructure automation and deployment pipeline support.',
          coreServices: ['DevOps Automation', 'CI/CD Support', 'Cloud Operations'],
          engineeringTeam: ['Emma Taylor'],
        },
        {
          id: 105,
          name: 'Client E Corp',
          invoiceText: 'Ongoing backend feature delivery and production support.',
          coreServices: ['Backend Development', 'Service Monitoring', 'Technical Support'],
          engineeringTeam: ['David Miller'],
        },
      ],
    },
    {
      id: 4,
      name: 'Lisa Martinez',
      position: 'Manager',
      company: 'Tech Corp',
      image: '../public/placeholder-image-person.webp',
      employees: [
        { id: 9, name: 'Frank Anderson', position: 'Project Manager' },
        { id: 10, name: 'Grace Lee', position: 'Business Analyst' },
        { id: 11, name: 'Henry White', position: 'Scrum Master' },
        { id: 12, name: 'Iris Black', position: 'Documentation Specialist' },
      ],
      clients: [
        {
          id: 106,
          name: 'Client F International',
          invoiceText: 'Delivery coordination, requirements management, and documentation.',
          coreServices: ['Project Management', 'Business Analysis', 'Documentation'],
          engineeringTeam: ['Frank Anderson', 'Grace Lee', 'Iris Black'],
        },
        {
          id: 107,
          name: 'Client G Networks',
          invoiceText: 'Agile delivery management and cross-team support services.',
          coreServices: ['Scrum Facilitation', 'Delivery Reporting', 'Stakeholder Support'],
          engineeringTeam: ['Frank Anderson', 'Henry White'],
        },
      ],
    },
  ],
};

export default function OrganizationChart() {
  const [activeDropdowns, setActiveDropdowns] = useState({});
  const [searchQueries, setSearchQueries] = useState({});
  const [selectedClient, setSelectedClient] = useState(null);

  const toggleSection = (managerId, section) => {
    setActiveDropdowns((prev) => ({
      ...prev,
      [managerId]: prev[managerId] === section ? null : section,
    }));
  };

  const updateSearchQuery = (managerId, section, value) => {
    setSearchQueries((prev) => ({
      ...prev,
      [`${managerId}-${section}`]: value,
    }));
  };

  return (
    <div className="org-chart-container">
      <h1 className="chart-title">ORGANIZATIONAL CHART AND CLIENT PORTFOLIO</h1>

      <div className="org-section">
        <div className="director-node">
          <img
            src={organizationData.director.image}
            alt={organizationData.director.name}
            className="node-image"
          />
          <div className="node-info">
            <h3 className="node-name">{organizationData.director.name}</h3>
            <p className="node-position">{organizationData.director.position}</p>
            <p className="node-company">{organizationData.director.company}</p>
          </div>
        </div>

        <div className="director-branch"></div>
        <div className="managers-connector"></div>

        <div className="managers-container">
          {organizationData.managers.map((manager) => {
            const employeesExpanded = activeDropdowns[manager.id] === 'employees';
            const clientsExpanded = activeDropdowns[manager.id] === 'clients';
            const employeeSearch = searchQueries[`${manager.id}-employees`] ?? '';
            const clientSearch = searchQueries[`${manager.id}-clients`] ?? '';
            const filteredEmployees = manager.employees.filter((employee) => {
              const query = employeeSearch.trim().toLowerCase();

              return (
                employee.name.toLowerCase().includes(query) ||
                employee.position.toLowerCase().includes(query)
              );
            });
            const filteredClients = manager.clients.filter((client) =>
              client.name.toLowerCase().includes(clientSearch.trim().toLowerCase()),
            );

            return (
              <div key={manager.id} className="manager-section">
                <div className="vertical-connector"></div>

                <div className="manager-node">
                  <div className="manager-node-details">
                    <img src={manager.image} alt={manager.name} className="node-image" />
                    <div className="node-info">
                      <h3 className="node-name">{manager.name}</h3>
                      <p className="node-position">{manager.position}</p>
                      <p className="node-company">{manager.company}</p>
                    </div>
                  </div>

                  <div className="dropdown-actions">
                    <button
                      className={`dropdown-toggle ${employeesExpanded ? 'expanded' : ''}`}
                      onClick={() => toggleSection(manager.id, 'employees')}
                      aria-expanded={Boolean(employeesExpanded)}
                      aria-controls={`employees-${manager.id}`}
                    >
                      <span>Employees</span>
                      <span className="toggle-icon">v</span>
                    </button>
                    <button
                      className={`dropdown-toggle clients-toggle ${
                        clientsExpanded ? 'expanded' : ''
                      }`}
                      onClick={() => toggleSection(manager.id, 'clients')}
                      aria-expanded={Boolean(clientsExpanded)}
                      aria-controls={`clients-${manager.id}`}
                    >
                      <span>Clients</span>
                      <span className="toggle-icon">v</span>
                    </button>
                  </div>
                </div>

                <div className="dropdown-panels">
                  {employeesExpanded && (
                    <div className="dropdown-content" id={`employees-${manager.id}`}>
                      <div className="dropdown-section">
                        <h4 className="section-title">Employees / Engineers</h4>
                        <input
                          className="dropdown-search"
                          type="search"
                          placeholder="Search for an engineer"
                          value={employeeSearch}
                          onChange={(event) =>
                            updateSearchQuery(manager.id, 'employees', event.target.value)
                          }
                        />
                        <ul className="items-list">
                          {filteredEmployees.map((employee) => (
                            <li key={employee.id} className="list-item">
                              <span className="item-name">{employee.name}</span>
                              <span className="item-position">{employee.position}</span>
                            </li>
                          ))}
                          {filteredEmployees.length === 0 && (
                            <li className="empty-list-item">No engineers found.</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  )}

                  {clientsExpanded && (
                    <div className="dropdown-content" id={`clients-${manager.id}`}>
                      <div className="dropdown-section">
                        <h4 className="section-title">Clients</h4>
                        <input
                          className="dropdown-search"
                          type="search"
                          placeholder="Search for a client"
                          value={clientSearch}
                          onChange={(event) =>
                            updateSearchQuery(manager.id, 'clients', event.target.value)
                          }
                        />
                        <ul className="items-list">
                          {filteredClients.map((client) => (
                            <li key={client.id} className="list-item client-item">
                              <button
                                className="client-detail-button"
                                onClick={() => setSelectedClient(client)}
                              >
                                {client.name}
                              </button>
                            </li>
                          ))}
                          {filteredClients.length === 0 && (
                            <li className="empty-list-item">No clients found.</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="horizontal-connector"></div>
      </div>

      {selectedClient && (
        <div
          className="modal-backdrop"
          role="presentation"
          onClick={() => setSelectedClient(null)}
        >
          <div
            className="client-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="client-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedClient(null)}
              aria-label="Close client details"
            >
              x
            </button>

            <h2 id="client-modal-title">{selectedClient.name}</h2>

            <div className="client-detail-section">
              <h3>Invoice Text</h3>
              <p>{selectedClient.invoiceText}</p>
            </div>

            <div className="client-detail-section">
              <h3>Core Services</h3>
              <ul>
                {selectedClient.coreServices.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            </div>

            <div className="client-detail-section">
              <h3>Engineering Team</h3>
              <ul>
                {selectedClient.engineeringTeam.map((member) => (
                  <li key={member}>{member}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
