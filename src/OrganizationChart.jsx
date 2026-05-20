import { useEffect, useState } from 'react';
import './OrganizationChart.css';

const personImage = '/placeholder-image-person.webp';
const managerCardGap = 36;
const managerCardMaxWidth = 300;

const getManagerColumnCount = () => {
  if (typeof window === 'undefined') {
    return 4;
  }

  if (window.innerWidth <= 767) {
    return 1;
  }

  if (window.innerWidth <= 900) {
    return 2;
  }

  if (window.innerWidth <= 1200) {
    return 3;
  }

  return 4;
};

const chunkItems = (items, size) =>
  items.reduce((rows, item, index) => {
    if (index % size === 0) {
      rows.push([]);
    }

    rows[rows.length - 1].push(item);
    return rows;
  }, []);

function useManagerColumnCount() {
  const [columnCount, setColumnCount] = useState(getManagerColumnCount);

  useEffect(() => {
    const updateColumnCount = () => setColumnCount(getManagerColumnCount());

    window.addEventListener('resize', updateColumnCount);
    return () => window.removeEventListener('resize', updateColumnCount);
  }, []);

  return columnCount;
}

const organizationData = {
  director: {
    id: 1,
    name: 'John Smith',
    position: 'Director',
    company: 'Tech Corp',
    image: personImage,
  },
  managers: [
    {
      id: 2,
      name: 'Sarah Johnson',
      position: 'Manager',
      company: 'Tech Corp',
      image: personImage,
      employees: [
        { id: 4, name: 'Alice Brown', position: 'Senior Developer', image: personImage },
        { id: 5, name: 'Bob Wilson', position: 'QA Engineer', image: personImage },
        { id: 6, name: 'Carol Davis', position: 'UI Designer', image: personImage },
      ],
      clients: [
        {
          id: 101,
          name: 'Client A Inc.',
          type: 'Recurring',
          invoiceText: 'Monthly managed support and platform maintenance retainer.',
          coreServices: ['Application Support', 'Cloud Monitoring', 'QA Regression'],
          engineeringTeam: ['Alice Brown', 'Bob Wilson'],
        },
        {
          id: 102,
          name: 'Client B Solutions',
          type: 'Prepaid',
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
      image: personImage,
      employees: [
        { id: 7, name: 'David Miller', position: 'Backend Developer', image: personImage },
        { id: 8, name: 'Emma Taylor', position: 'DevOps Engineer', image: personImage },
        { id: 9, name: 'Noah Garcia', position: 'Cloud Engineer', image: personImage },
      ],
      clients: [
        {
          id: 103,
          name: 'Client C Global',
          type: 'Recurring',
          invoiceText: 'Backend modernization, API maintenance, and incident response.',
          coreServices: ['API Development', 'Database Optimization', 'Incident Response'],
          engineeringTeam: ['David Miller', 'Emma Taylor'],
        },
        {
          id: 104,
          name: 'Client D Tech',
          type: 'Prepaid',
          invoiceText: 'Infrastructure automation and deployment pipeline support.',
          coreServices: ['DevOps Automation', 'CI/CD Support', 'Cloud Operations'],
          engineeringTeam: ['Emma Taylor', 'Noah Garcia'],
        },
        {
          id: 105,
          name: 'Client E Corp',
          type: 'Recurring',
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
      image: personImage,
      employees: [
        { id: 10, name: 'Frank Smith', position: 'Project Manager', image: personImage },
        { id: 11, name: 'Grace Lee', position: 'Business Analyst', image: personImage },
        { id: 12, name: 'Henry White', position: 'Scrum Master', image: personImage },
        { id: 13, name: 'Iris Black', position: 'Documentation', image: personImage },
      ],
      clients: [
        {
          id: 106,
          name: 'Client F International',
          type: 'Recurring',
          invoiceText: 'Delivery coordination, requirements management, and documentation.',
          coreServices: ['Project Management', 'Business Analysis', 'Documentation'],
          engineeringTeam: ['Frank Smith', 'Grace Lee', 'Iris Black'],
        },
        {
          id: 107,
          name: 'Client G Networks',
          type: 'Prepaid',
          invoiceText: 'Agile delivery management and cross-team support services.',
          coreServices: ['Scrum Facilitation', 'Delivery Reporting', 'Stakeholder Support'],
          engineeringTeam: ['Frank Smith', 'Henry White'],
        },
      ],
    },
    {
      id: 14,
      name: 'Priya Patel',
      position: 'Manager',
      company: 'Tech Corp',
      image: personImage,
      employees: [
        { id: 15, name: 'Liam Turner', position: 'Full Stack Engineer', image: personImage },
        { id: 16, name: 'Mia Santos', position: 'QA Automation Engineer', image: personImage },
        { id: 17, name: 'Owen Brooks', position: 'Support Engineer', image: personImage },
      ],
      clients: [
        {
          id: 108,
          name: 'Client H Studios',
          type: 'Recurring',
          invoiceText: 'Application support, automated testing, and release readiness.',
          coreServices: ['Full Stack Support', 'QA Automation', 'Release Management'],
          engineeringTeam: ['Liam Turner', 'Mia Santos'],
        },
        {
          id: 109,
          name: 'Client I Retail',
          type: 'Prepaid',
          invoiceText: 'Prepaid support hours for feature fixes and operational requests.',
          coreServices: ['Support Engineering', 'Bug Fixes', 'Operational Requests'],
          engineeringTeam: ['Owen Brooks', 'Liam Turner'],
        },
      ],
    },
    {
      id: 18,
      name: 'Daniel Kim',
      position: 'Manager',
      company: 'Tech Corp',
      image: personImage,
      employees: [
        { id: 19, name: 'Nina Clarke', position: 'Data Engineer', image: personImage },
        { id: 20, name: 'Ethan Wright', position: 'Backend Engineer', image: personImage },
        { id: 21, name: 'Sofia Reyes', position: 'Analytics Engineer', image: personImage },
      ],
      clients: [
        {
          id: 110,
          name: 'Client J Analytics',
          type: 'Recurring',
          invoiceText: 'Monthly data pipeline operations and analytics platform support.',
          coreServices: ['Data Pipelines', 'Analytics Support', 'Reporting'],
          engineeringTeam: ['Nina Clarke', 'Sofia Reyes'],
        },
        {
          id: 111,
          name: 'Client K Finance',
          type: 'Prepaid',
          invoiceText: 'Prepaid backend engineering block for integrations and reporting.',
          coreServices: ['Backend Integrations', 'Data Modeling', 'Report Automation'],
          engineeringTeam: ['Ethan Wright', 'Nina Clarke'],
        },
      ],
    },
    {
      id: 22,
      name: 'Rachel Green',
      position: 'Manager',
      company: 'Tech Corp',
      image: personImage,
      employees: [
        { id: 23, name: 'Jack Evans', position: 'Mobile Engineer', image: personImage },
        { id: 24, name: 'Ava Flores', position: 'Frontend Engineer', image: personImage },
        { id: 25, name: 'Leo Morris', position: 'UX Engineer', image: personImage },
      ],
      clients: [
        {
          id: 112,
          name: 'Client L Mobile',
          type: 'Recurring',
          invoiceText: 'Recurring mobile application maintenance and storefront support.',
          coreServices: ['Mobile Development', 'Frontend Support', 'UX Improvements'],
          engineeringTeam: ['Jack Evans', 'Ava Flores'],
        },
        {
          id: 113,
          name: 'Client M Commerce',
          type: 'Prepaid',
          invoiceText: 'Prepaid design implementation and ecommerce enhancement work.',
          coreServices: ['Frontend Development', 'UX Engineering', 'Commerce Support'],
          engineeringTeam: ['Ava Flores', 'Leo Morris'],
        },
      ],
    },
    {
      id: 26,
      name: 'Ahmed Hassan',
      position: 'Manager',
      company: 'Tech Corp',
      image: personImage,
      employees: [
        { id: 27, name: 'Maya Nelson', position: 'Security Engineer', image: personImage },
        { id: 28, name: 'Caleb Young', position: 'Systems Engineer', image: personImage },
        { id: 29, name: 'Zoe Morgan', position: 'DevSecOps Engineer', image: personImage },
      ],
      clients: [
        {
          id: 114,
          name: 'Client N Secure',
          type: 'Recurring',
          invoiceText: 'Security monitoring, platform hardening, and monthly reviews.',
          coreServices: ['Security Monitoring', 'Platform Hardening', 'Compliance Support'],
          engineeringTeam: ['Maya Nelson', 'Zoe Morgan'],
        },
        {
          id: 115,
          name: 'Client O Systems',
          type: 'Prepaid',
          invoiceText: 'Prepaid infrastructure support and systems remediation package.',
          coreServices: ['Systems Engineering', 'Infrastructure Support', 'Remediation'],
          engineeringTeam: ['Caleb Young', 'Maya Nelson'],
        },
      ],
    },
    {
      id: 30,
      name: 'Olivia Nguyen',
      position: 'Manager',
      company: 'Tech Corp',
      image: personImage,
      employees: [
        { id: 31, name: 'Ryan Hughes', position: 'Platform Engineer', image: personImage },
        { id: 32, name: 'Ella Ward', position: 'SRE', image: personImage },
        { id: 33, name: 'Mateo Cruz', position: 'Release Engineer', image: personImage },
      ],
      clients: [
        {
          id: 116,
          name: 'Client P Platform',
          type: 'Recurring',
          invoiceText: 'Platform reliability retainer with release and observability support.',
          coreServices: ['Platform Engineering', 'Reliability Support', 'Observability'],
          engineeringTeam: ['Ryan Hughes', 'Ella Ward'],
        },
        {
          id: 117,
          name: 'Client Q Launch',
          type: 'Prepaid',
          invoiceText: 'Prepaid launch support and deployment readiness engagement.',
          coreServices: ['Release Engineering', 'Deployment Support', 'Launch Readiness'],
          engineeringTeam: ['Mateo Cruz', 'Ella Ward'],
        },
      ],
    },
  ],
};

export default function OrganizationChart() {
  const [activeDropdowns, setActiveDropdowns] = useState({});
  const [searchQueries, setSearchQueries] = useState({});
  const [clientTypeFilters, setClientTypeFilters] = useState({});
  const [selectedClient, setSelectedClient] = useState(null);
  const managerColumnCount = useManagerColumnCount();
  const managerRows = chunkItems(organizationData.managers, managerColumnCount);

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

  const updateClientTypeFilter = (managerId, value) => {
    setClientTypeFilters((prev) => ({
      ...prev,
      [managerId]: value,
    }));
  };

  return (
    <div className="org-chart-container">
      <h1 className="chart-title">HK Client Portfolio</h1>

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

        <div className="managers-container">
          {managerRows.map((managerRow) => (
            <div
              key={managerRow.map((manager) => manager.id).join('-')}
              className="manager-row"
              style={{
                '--manager-row-count': managerRow.length,
                '--manager-row-width': `${managerRow.length * managerCardMaxWidth + (managerRow.length - 1) * managerCardGap}px`,
              }}
            >
              {managerRow.length > 1 && <div className="row-connector"></div>}
              {managerRow.map((manager) => {
            const employeesExpanded = activeDropdowns[manager.id] === 'employees';
            const clientsExpanded = activeDropdowns[manager.id] === 'clients';
            const employeeSearch = searchQueries[`${manager.id}-employees`] ?? '';
            const clientSearch = searchQueries[`${manager.id}-clients`] ?? '';
            const clientTypeFilter = clientTypeFilters[manager.id] ?? 'All';
            const employeeQuery = employeeSearch.trim().toLowerCase();
            const clientQuery = clientSearch.trim().toLowerCase();
            const filteredEmployees = manager.employees.filter(
              (employee) =>
                employee.name.toLowerCase().includes(employeeQuery) ||
                employee.position.toLowerCase().includes(employeeQuery),
            );
            const filteredClients = manager.clients.filter((client) => {
              const matchesSearch = client.name.toLowerCase().includes(clientQuery);
              const matchesType = clientTypeFilter === 'All' || client.type === clientTypeFilter;

              return matchesSearch && matchesType;
            });

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
                      <span>Engineers</span>
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
                        <h4 className="section-title">Engineers</h4>
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
                            <li key={employee.id} className="employee-item">
                              <img
                                src={employee.image}
                                alt={employee.name}
                                className="employee-avatar"
                              />
                              <span className="employee-summary">
                                <span className="item-name">{employee.name}</span>
                                <span className="item-position">{employee.position}</span>
                              </span>
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
                        <h4 className="section-title clients-title">Clients</h4>
                        <input
                          className="dropdown-search"
                          type="search"
                          placeholder="Search for a client"
                          value={clientSearch}
                          onChange={(event) =>
                            updateSearchQuery(manager.id, 'clients', event.target.value)
                          }
                        />
                        <select
                          className="dropdown-filter"
                          value={clientTypeFilter}
                          onChange={(event) => updateClientTypeFilter(manager.id, event.target.value)}
                          aria-label={`Filter clients for ${manager.name} by type`}
                        >
                          <option value="All">All client types</option>
                          <option value="Recurring">Recurring</option>
                          <option value="Prepaid">Prepaid</option>
                        </select>
                        <ul className="items-list">
                          {filteredClients.map((client) => (
                            <li key={client.id} className="list-item client-item">
                              <button
                                className="client-detail-button"
                                onClick={() => setSelectedClient(client)}
                              >
                                <span>{client.name}</span>
                                <span className={`client-type-badge ${client.type.toLowerCase()}`}>
                                  {client.type}
                                </span>
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
          ))}
        </div>
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
              <h3>Client Type</h3>
              <p>{selectedClient.type}</p>
            </div>

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
