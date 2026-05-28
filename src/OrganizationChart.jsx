import { useEffect, useState } from 'react';

import { organizationData } from './Data';

import './OrganizationChart.css';

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



export default function OrganizationChart() {
  const [activeDropdowns, setActiveDropdowns] = useState({});
  const [searchQueries, setSearchQueries] = useState({});
  const [clientTypeFilters, setClientTypeFilters] = useState({});
  const [selectedClient, setSelectedClient] = useState(null);
  const managerColumnCount = useManagerColumnCount();
  const managerRows = chunkItems(organizationData.managers, managerColumnCount);

  const toggleSection = (managerId, section) => {
    setActiveDropdowns((prev) => {
      // Reset search and filters when collapsing a dropdown
      if (section === 'employees') {
        setSearchQueries((prevSearch) => ({
          ...prevSearch,
          [`${managerId}-employees`]: '',
        }));
      }

      if (section === 'clients') {
        setSearchQueries((prevSearch) => ({
          ...prevSearch,
          [`${managerId}-clients`]: '',
        }));
        setClientTypeFilters((prevClientTypes) => ({
          ...prevClientTypes,
          [managerId]: 'All',
        }));
      }

      return {
        ...prev,
        [managerId]: prev[managerId] === section ? null : section,
      };
    });
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
                            <li key={client.id} className={`list-item client-item ${client.type.toLowerCase()}`}>
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
