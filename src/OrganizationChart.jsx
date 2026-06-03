import { useEffect, useState } from 'react';

import ClientModal from './components/ClientModal';
import PersonSummary from './components/PersonSummary';
import ManagerSection from './components/ManagerSection';
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

const getManagerRowWidth = (managerCount) =>
  `${managerCount * managerCardMaxWidth + (managerCount - 1) * managerCardGap}px`;

export default function OrganizationChart() {
  const [activeDropdowns, setActiveDropdowns] = useState({});
  const [searchQueries, setSearchQueries] = useState({});
  const [clientTypeFilters, setClientTypeFilters] = useState({});
  const [selectedClient, setSelectedClient] = useState(null);
  const managerColumnCount = useManagerColumnCount();
  const managerRows = chunkItems(organizationData.managers, managerColumnCount);

  const resetManagerSectionState = (managerId, section) => {
    const searchKey = `${managerId}-${section}`;

    setSearchQueries((prevSearch) => ({
      ...prevSearch,
      [searchKey]: '',
    }));

    if (section === 'clients') {
      setClientTypeFilters((prevClientTypes) => ({
        ...prevClientTypes,
        [managerId]: 'All',
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

  const updateClientTypeFilter = (managerId, value) => {
    setClientTypeFilters((prevFilters) => ({
      ...prevFilters,
      [managerId]: value,
    }));
  };

  return (
    <div className="org-chart-container">
      <h1 className="chart-title">HK Client Portfolio</h1>

      <div className="org-section">
        <div className="director-node">
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
                  clientTypeFilter={clientTypeFilters[manager.id] ?? 'All'}
                  onToggleSection={toggleSection}
                  onEmployeeSearchChange={(value) =>
                    updateSearchQuery(manager.id, 'employees', value)
                  }
                  onClientSearchChange={(value) => updateSearchQuery(manager.id, 'clients', value)}
                  onClientTypeChange={(value) => updateClientTypeFilter(manager.id, value)}
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
    </div>
  );
}
