import { useEffect, useMemo, useState } from 'react';

import ClientFilterDropdown from './components/ClientFilterDropdown';
import ClientModal from './components/ClientModal';
import PersonSummary from './components/PersonSummary';
import ManagerSection from './components/ManagerSection';
import PersonModal from './components/PersonModal';
import {
  defaultClientFilters,
  filterClients,
  getClientTierLabel,
  getClientTierValue,
  hasServiceDesk,
} from './clientFilters';
import { fetchOrganizationData } from './data/organizationDataService';

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

const getManagerRowWidth = (managerCount) =>
  `${managerCount * managerCardMaxWidth + (managerCount - 1) * managerCardGap}px`;

const normalizeText = (value) => String(value ?? '').trim().toLowerCase();

const getUniqueClients = (clients) => {
  const clientsByName = new Map();

  clients.forEach((client) => {
    const clientKey = `${normalizeText(client.name)}-${normalizeText(client.type)}`;
    const existingClient = clientsByName.get(clientKey);

    if (!existingClient) {
      clientsByName.set(clientKey, client);
      return;
    }

    const preferredClient =
      !getClientTierValue(existingClient) && getClientTierValue(client) ? client : existingClient;

    clientsByName.set(clientKey, {
      ...preferredClient,
      coreServices: Array.from(
        new Set([...(existingClient.coreServices ?? []), ...(client.coreServices ?? [])]),
      ).filter(Boolean),
      engineeringTeam: Array.from(
        new Set([...(existingClient.engineeringTeam ?? []), ...(client.engineeringTeam ?? [])]),
      ),
      managerIds: Array.from(
        new Set([...(existingClient.managerIds ?? []), ...(client.managerIds ?? [])]),
      ),
    });
  });

  return Array.from(clientsByName.values()).sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
  );
};

const getAllClients = (organizationData) =>
  organizationData.managers.flatMap((manager) =>
    manager.clients.map((client, index) => ({
      ...client,
      managerName: manager.name,
      searchKey: `client-${manager.id}-${client.id}-${normalizeText(client.name)}-${index}`,
    })),
  );

const getPeople = (organizationData, allClients) => {
  const findClientsForPerson = (personName) =>
    getUniqueClients(
      allClients.filter((client) =>
        client.engineeringTeam?.some((member) => normalizeText(member) === normalizeText(personName)),
      ),
    );

  return [
    {
      ...organizationData.director,
      // clients: getUniqueClients(allClients),
      clients: [],
      roleLabel: 'Director',
      searchKey: `person-director-${organizationData.director.id}`,
    },
    ...organizationData.managers.flatMap((manager) => [
      {
        ...manager,
        clients: getUniqueClients(manager.clients),
        roleLabel: 'Manager',
        searchKey: `person-manager-${manager.id}`,
      },
      ...manager.employees.map((employee, index) => ({
        ...employee,
        clients: findClientsForPerson(employee.name),
        company: manager.company,
        managerName: manager.name,
        roleLabel: 'Engineer',
        searchKey: `person-employee-${manager.id}-${employee.id}-${normalizeText(employee.name)}-${index}`,
      })),
    ]),
  ];
};

const getGlobalSearchResults = (query, people, clients, scope, clientFilters) => {
  const normalizedQuery = normalizeText(query);

  if (!normalizedQuery) {
    return { people: [], clients: [] };
  }

  const matchingPeople = scope === 'clients' ? [] : people
    .filter(
      (person) =>
        normalizeText(person.name).includes(normalizedQuery) ||
        normalizeText(person.position).includes(normalizedQuery),
    )
    .map((person) => ({
      item: person,
      position: person.position,
      key: person.searchKey,
      kind: 'person',
      title: person.name,
      subtitle: `${person.position}${person.managerName ? ` · ${person.managerName}` : ''}`,
    })).slice(0, scope === 'people' ? 12 : 6);

  const filteredClients =
    scope === 'people'
      ? []
      : filterClients(getUniqueClients(clients), query, clientFilters);

  const matchingClients = filteredClients
    .map((client) => ({
      item: client,
      key: client.searchKey,
      kind: 'client',
      title: client.name,
      coreServices: client.coreServices,
      subtitle: `${client.type} · ${getClientTierLabel(client)}`,
    })).slice(0, scope === 'clients' ? 12 : 8);

  return {
    people: matchingPeople,
    clients: matchingClients,
    clientCount: filteredClients.length,
  };
};

const searchScopeOptions = [
  { value: 'both', label: 'Both' },
  { value: 'people', label: 'People' },
  { value: 'clients', label: 'Clients' },
];

export default function OrganizationChart() {
  const [organizationData, setOrganizationData] = useState(null);
  const [dataStatus, setDataStatus] = useState('loading');
  const [dataError, setDataError] = useState(null);
  const [activeDropdowns, setActiveDropdowns] = useState({});
  const [clientFiltersByManager, setClientFiltersByManager] = useState({});
  const [searchQueries, setSearchQueries] = useState({});
  const [globalSearchScope, setGlobalSearchScope] = useState('both');
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [globalClientFilters, setGlobalClientFilters] = useState(defaultClientFilters);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const managerColumnCount = useManagerColumnCount();

  useEffect(() => {
    let isCurrent = true;

    fetchOrganizationData()
      .then((data) => {
        if (!isCurrent) {
          return;
        }

        setOrganizationData(data);
        setDataStatus('success');
      })
      .catch((error) => {
        if (!isCurrent) {
          return;
        }

        setDataError(error);
        setDataStatus('error');
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  const managerRows = useMemo(
    () => chunkItems(organizationData?.managers ?? [], managerColumnCount),
    [managerColumnCount, organizationData],
  );
  const allClients = useMemo(
    () => (organizationData ? getAllClients(organizationData) : []),
    [organizationData],
  );
  const people = useMemo(
    () => (organizationData ? getPeople(organizationData, allClients) : []),
    [allClients, organizationData],
  );
  const peopleByKey = useMemo(
    () => new Map(people.map((person) => [person.searchKey, person])),
    [people],
  );
  const globalSearchResults = useMemo(
    () =>
      getGlobalSearchResults(
        globalSearchQuery,
        people,
        allClients,
        globalSearchScope,
        globalClientFilters,
      ),
    [allClients, globalClientFilters, globalSearchQuery, globalSearchScope, people],
  );

  if (dataStatus === 'loading') {
    return (
      <div className="org-chart-container data-state">
        <div className="chart-header">
          <h1 className="chart-title">HK Client Portfolio</h1>
          <p className="data-state-message">Loading organization data...</p>
        </div>
      </div>
    );
  }

  if (dataStatus === 'error' || !organizationData) {
    return (
      <div className="org-chart-container data-state">
        <div className="chart-header">
          <h1 className="chart-title">HK Client Portfolio</h1>
          <p className="data-state-message">
            {dataError?.message ?? 'Unable to load organization data.'}
          </p>
        </div>
      </div>
    );
  }

  const resetManagerSectionState = (managerId, section) => {
    const searchKey = `${managerId}-${section}`;

    setSearchQueries((prevSearch) => ({
      ...prevSearch,
      [searchKey]: '',
    }));

    if (section === 'clients') {
      setClientFiltersByManager((prevFilters) => ({
        ...prevFilters,
        [managerId]: defaultClientFilters,
      }));
    }
  };

  const toggleSection = (managerId, section) => {
    resetManagerSectionState(managerId, section);

    setActiveDropdowns((prevDropdowns) => ({
      ...prevDropdowns,
      [managerId]: prevDropdowns[managerId] === section ? null : section,
    }));
  };

  const updateSearchQuery = (managerId, section, value) => {
    setSearchQueries((prevQueries) => ({
      ...prevQueries,
      [`${managerId}-${section}`]: value,
    }));
  };

  const updateClientFilters = (managerId, value) => {
    setClientFiltersByManager((prevFilters) => ({
      ...prevFilters,
      [managerId]: value,
    }));
  };

  const selectPerson = (personKey) => {
    setSelectedPerson(peopleByKey.get(personKey));
  };

  const selectClientFromPerson = (client) => {
    setSelectedPerson(null);
    setSelectedClient(client);
  };

  const selectGlobalSearchResult = (result) => {
    setGlobalSearchQuery('');

    if (result.kind === 'person') {
      setSelectedPerson(result.item);
      return;
    }

    setSelectedClient(result.item);
  };

  const handleDirectorKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectPerson(`person-director-${organizationData.director.id}`);
    }
  };

  return (
    <div className="org-chart-container">
      <div className="chart-header">
        <h1 className="chart-title">HK Client Portfolio</h1>

        <div className="global-search" role="search">
          <label className="visually-hidden" htmlFor="global-search-input">
            Search for a person or client
          </label>
          <input
            id="global-search-input"
            className="global-search-input"
            type="search"
            placeholder="Search people or clients"
            value={globalSearchQuery}
            onChange={(event) => setGlobalSearchQuery(event.target.value)}
          />

          {globalSearchQuery.trim() && (
            <div className="global-search-results">
              <div className="global-search-scope" role="group" aria-label="Choose search result type">
                {searchScopeOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`search-scope-button ${
                      globalSearchScope === option.value ? 'active' : ''
                    }`}
                    aria-pressed={globalSearchScope === option.value}
                    onClick={() => setGlobalSearchScope(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              {globalSearchScope !== 'clients' && (
                <section className="search-result-section">
                  <h3 className="search-result-section-title">People</h3>
                  <ul>
                    {globalSearchResults.people.map((result) => (
                      <li key={result.key}>
                        <button
                          className="global-search-result"
                          type="button"
                          onClick={() => selectGlobalSearchResult(result)}
                        >
                          <span className={`search-result-kind ${result.kind}`}>{result.kind}</span>
                          <span className="search-result-text">
                            <span className="search-result-title">{result.title}</span>
                            <span className="search-result-subtitle">{result.subtitle}</span>
                          </span>
                        </button>
                      </li>
                    ))}

                    {globalSearchResults.people.length === 0 && (
                      <li className="empty-search-result">No people found.</li>
                    )}
                  </ul>
                </section>
              )}

              {globalSearchScope !== 'people' && (
                <section className="search-result-section">
                  <div className="search-result-section-header">
                    <h3 className="search-result-section-title">Clients</h3>
                    <ClientFilterDropdown
                      ariaLabel="Open global client search filters"
                      filteredClientCount={globalSearchResults.clientCount}
                      filters={globalClientFilters}
                      onChange={setGlobalClientFilters}
                    />
                  </div>

                  <ul>
                    {globalSearchResults.clients.map((result) => (
                      <li key={result.key}>
                        <button
                          className="global-search-result"
                          type="button"
                          onClick={() => selectGlobalSearchResult(result)}
                        >
                          <span className={`search-result-kind ${result.kind}`}>{result.kind}</span>
                          <span className="search-result-text">
                            <span className="search-result-title">
                              {result.title}
                              {hasServiceDesk(result.item) && (
                                <span className="service-desk-indicator" title="Service Desk"></span>
                              )}
                            </span>
                            <span className="search-result-subtitle">{result.subtitle}</span>
                          </span>
                        </button>
                      </li>
                    ))}

                    {globalSearchResults.clients.length === 0 && (
                      <li className="empty-search-result">No clients found.</li>
                    )}
                  </ul>
                </section>
              )}

            </div>
          )}
        </div>
      </div>

      <div className="org-section">
        <div
          className="director-node"
          role="button"
          tabIndex={0}
          onClick={() => selectPerson(`person-director-${organizationData.director.id}`)}
          onKeyDown={handleDirectorKeyDown}
          aria-label={`Open details for ${organizationData.director.name}`}
        >
          <PersonSummary person={organizationData.director} />
        </div>
        <div className="director-branch"></div>

        <div className="managers-container">
          {managerRows.map((managerRow) => (
            <div
              key={managerRow.map((manager) => manager.id).join('-')}
              className="manager-row"
              style={{
                '--manager-row-count': managerRow.length,
                '--manager-row-width': getManagerRowWidth(managerRow.length),
              }}
            >
              {managerRow.length > 1 && <div className="row-connector"></div>}

              {managerRow.map((manager) => (
                <ManagerSection
                  key={manager.id}
                  manager={manager}
                  activeSection={activeDropdowns[manager.id]}
                  employeeSearch={searchQueries[`${manager.id}-employees`] ?? ''}
                  clientSearch={searchQueries[`${manager.id}-clients`] ?? ''}
                  clientFilters={clientFiltersByManager[manager.id] ?? defaultClientFilters}
                  onToggleSection={toggleSection}
                  onSelectManager={() => selectPerson(`person-manager-${manager.id}`)}
                  onSelectEmployee={(employee) => {
                    const employeeIndex = manager.employees.findIndex(
                      (currentEmployee) => currentEmployee === employee,
                    );

                    selectPerson(
                      `person-employee-${manager.id}-${employee.id}-${normalizeText(employee.name)}-${employeeIndex}`,
                    );
                  }}
                  onEmployeeSearchChange={(value) =>
                    updateSearchQuery(manager.id, 'employees', value)
                  }
                  onClientSearchChange={(value) => updateSearchQuery(manager.id, 'clients', value)}
                  onClientFiltersChange={(value) => updateClientFilters(manager.id, value)}
                  onSelectClient={setSelectedClient}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {selectedClient && (
        <ClientModal client={selectedClient} onClose={() => setSelectedClient(null)} />
      )}

      {selectedPerson && (
        <PersonModal
          person={selectedPerson}
          onClose={() => setSelectedPerson(null)}
          onSelectClient={selectClientFromPerson}
        />
      )}
    </div>
  );
}
