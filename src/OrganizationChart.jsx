import { useEffect, useState } from 'react';
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

const organizationData = {
  director: {
    id: 1,
    name: 'Allo Hui',
    position: 'IT & Operations Director',
    company: 'FunctionEight',
    image: '/avatars/HK - Allo Hui.png',
  },
  managers: [
    {
      id: 2,
      name: 'Kay Yeung',
      position: 'IT Manager',
      company: 'FunctionEight',
      image: '/avatars/HK - Kay Yeung.png',
      employees: [
        { id: 4, name: 'Derek Lai', position: 'System Engineer', image: '/avatars/HK - Derek Lai.png'},
        { id: 5, name: 'Harold Sit', position: 'System Engineer', image: '/avatars/HK - Harold Sit.png'},
        { id: 6, name: 'Alvin Luk', position: 'System Engineer', image: '/avatars/HK - Alvin Luk.png'},
        { id: 7, name: 'Justin Chung', position: 'System Engineer', image: '/avatars/HK - Justin Chung.png'},
        { id: 8, name: 'Victor Cheng', position: 'System Engineer', image: '/avatars/HK - Victor Cheng.png'},
      ],
      clients: [
        {
          id: 101,
          name: 'Oval',
          type: 'Recurring',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Derek Lai'],
        },
        {
          id: 102,
          name: 'H Properties',
          type: 'Recurring',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Kay Yeung'],
        },
        {
          id: 103,
          name: 'Triide',
          type: 'Recurring',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Kay Yeung', 'SD'],
        },
        {
          id: 104,
          name: 'Limetree',
          type: 'Recurring',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Kay Yeung'],
        },
        {
          id: 105,
          name: 'EAL',
          type: 'Recurring',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Kay Yeung'],
        },
        {
          id: 106,
          name: 'EIP',
          type: 'Recurring',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Kay Yeung'],
        },
        {
          id: 107,
          name: 'Perfectos',
          type: 'Recurring',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Alvin Luk'],
        },
        {
          id: 108,
          name: 'Rockpool',
          type: 'Recurring',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Kay Yeung'],
        },
        {
          id: 109,
          name: 'NPL',
          type: 'Recurring',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Justin Chung'],
        },
        {
          id: 110,
          name: 'BMS (SG)',
          type: 'Recurring',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Justin Chung'],
        },
        {
          id: 111,
          name: 'Apeiron (SG)',
          type: 'Recurring',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Justin Chung'],
        },
        {
          id: 112,
          name: 'Funville',
          type: 'Recurring',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Alvin Luk'],
        },
        {
          id: 113,
          name: 'Hauck',
          type: 'Recurring',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Justin Chung'],
        },
        {
          id: 114,
          name: 'EGIS',
          type: 'Recurring',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Victor Cheng'],
        },
        {
          id: 115,
          name: 'APLMA',
          type: 'Recurring',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Justin Chung'],
        },
        {
          id: 116,
          name: 'KYO Capital',
          type: 'Recurring',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Justin Chung'],
        },
        {
          id: 117,
          name: 'Connect',
          type: 'Recurring',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Kay Yeung', 'SD'],
        },
        {
          id: 118,
          name: 'TTA',
          type: 'Recurring',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Kay Yeung', 'SD'],
        },
        {
          id: 119,
          name: 'CCCL',
          type: 'Recurring',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Justin Chung'],
        },
        {
          id: 120,
          name: 'Fidinam',
          type: 'Recurring',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Harold Sit'],
        },
        {
          id: 121,
          name: 'LettersThoo',
          type: 'Recurring',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Kay Yeung', 'SD'],
        },
        {
          id: 122,
          name: 'LewisSanders',
          type: 'Recurring',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Kay Yeung', 'SD'],
        },
        {
          id: 123,
          name: 'LiquidStack (??)',
          type: 'Recurring',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Justin Chung'],
        },
        {
          id: 124,
          name: 'Signal 8',
          type: 'Recurring',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Justin Chung'],
        },
        {
          id: 125,
          name: 'Sylebra',
          type: 'Recurring',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Alvin Luk'],
        },
        {
          id: 126,
          name: 'Zaaba',
          type: 'Recurring',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Harold Sit'],
        },
        {
          id: 127,
          name: 'Zaha',
          type: 'Recurring',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Derek Lai'],
        },
        {
          id: 128,
          name: 'Naga',
          type: 'Prepaid',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Kay Yeung', 'SD'],
        },
        {
          id: 129,
          name: 'Austcham',
          type: 'Prepaid',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Harold Sit', 'SD'],
        },
        {
          id: 130,
          name: 'Grace',
          type: 'Prepaid',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Alvin Luk'],
        },
        {
          id: 131,
          name: 'Cotton on',
          type: 'Prepaid',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Alvin Luk'],
        },
        {
          id: 132,
          name: 'Zhao Da',
          type: 'Prepaid',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Alvin Luk'],
        },
        {
          id: 133,
          name: 'CAIA',
          type: 'Prepaid',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Kay Yeung', 'SD'],
        },
        {
          id: 134,
          name: 'Pathos',
          type: 'Prepaid',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Alvin Luk'],
        },
        {
          id: 135,
          name: 'DestinationChina',
          type: 'Prepaid',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Kay Yeung', 'SD'],
        },
        {
          id: 136,
          name: 'Sedona',
          type: 'Prepaid',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Kay Yeung', 'SD'],
        },
        {
          id: 137,
          name: 'Weichert',
          type: 'Prepaid',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Alvin Luk'],
        },
        {
          id: 138,
          name: 'Patti Wong',
          type: 'Prepaid',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Alvin Luk'],
        },
        {
          id: 139,
          name: 'UIB (SG)',
          type: 'Recurring',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Victor Cheng'],
        },
      ],
    },
    {
      id: 3,
      name: 'Kenneth Ip',
      position: 'Assistant IT Manager',
      company: 'FunctionEight',
      image: '/avatars/HK - Kenneth Ip.png',
      employees: [
        { id: 7, name: 'Russell Wan', position: 'System Engineer', image: '/avatars/HK - Russell.png'},
      ],
      clients: [
        {
          id: 140,
          name: 'Ninemasts (BCT)',
          type: 'Recurring',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Kenneth Ip'],
        },
        {
          id: 141,
          name: 'BCT Others',
          type: 'Prepaid',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Kenneth Ip'],
        },
        {
          id: 142,
          name: 'Liquidstack (SG)',
          type: 'Recurring',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Kenneth Ip'],
        },
        {
          id: 143,
          name: 'TTB',
          type: 'Recurring',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Kenneth Ip', 'SD'],
        },
        {
          id: 144,
          name: 'Buddy Finance',
          type: 'Recurring',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Kenneth Ip'],
        },
        {
          id: 145,
          name: 'Kavod',
          type: 'Prepaid',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Kenneth Ip'],
        },
      ],
    },
    {
      id: 4,
      name: 'Samuel Wong',
      position: 'Project Manager',
      company: 'FunctionEight',
      image: '/avatars/HK - Samuel Wong.png',
      employees: [
        { id: 10, name: 'Tony Li', position: 'System Engineer', image: '/avatars/HK - Tony Li.png'},
        { id: 11, name: 'Kin Leung', position: 'System Engineer', image: '/avatars/HK - Kin Leung.png'},
        { id: 12, name: 'Steve Wong', position: 'System Engineer', image: '/avatars/HK - Steve Wong.png'},
      ],
      clients: [
        {
          id: 146,
          name: 'Rugby',
          type: 'Recurring',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Tony Li'],
        },
        {
          id: 147,
          name: 'SPCA',
          type: 'Recurring',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Kin Leung', 'SD'],
        },
        {
          id: 148,
          name: "Mother's Choice",
          type: 'Recurring',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Samuel Wong', 'SD'],
        },
        {
          id: 149,
          name: 'Rede',
          type: 'Recurring',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Samuel Wong'],
        },
        {
          id: 150,
          name: 'Nexus Point',
          type: 'Recurring',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Samuel Wong'],
        },
      ],
    },
    {
      id: 14,
      name: 'Teflon Siu',
      position: 'Senior System Engineer',
    company: 'FunctionEight',
      image: '/avatars/HK - Teflon Siu.png',
      employees: [
      ],
      clients: [
        {
          id: 151,
          name: 'Pharo',
          type: 'Recurring',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Teflon Siu'],
        },
        {
          id: 152,
          name: 'China Silver',
          type: 'Prepaid',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Teflon Siu'],
        },
        {
          id: 153,
          name: 'Profile (Wilson Grp)',
          type: 'Recurring',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Teflon Siu'],
        },
        {
          id: 154,
          name: 'Native Union',
          type: 'Recurring',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Teflon Siu'],
        },
        {
          id: 155,
          name: 'Tradition Capital',
          type: 'Prepaid',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Teflon Siu'],
        },
        {
          id: 156,
          name: 'Resolution Chambers',
          type: 'Recurring',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Teflon Siu'],
        },
        {
          id: 157,
          name: 'White Cube',
          type: 'Recurring',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Teflon Siu'],
        },
        {
          id: 158,
          name: 'Conran',
          type: 'Recurring',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: ['Teflon Siu'],
        },
      ],
    },
    {
      id: 18,
      name: 'Alvin Wong',
      position: 'Enterprise Architect',
    company: 'FunctionEight',
      image: '/avatars/HK - Alvin Wong.png',
      employees: [
        { id: 19, name: 'Kelvin Hui', position: 'System Engineer', image: '/avatars/HK - Kelvin Hui.png' },
      ],
      clients: [
      ],
    },
    {
      id: 22,
      name: 'Harris Leong',
      position: 'Lead, Service Desk',
    company: 'FunctionEight',
      image: '/avatars/HK - Harris Leong.png',
      employees: [
        { id: 23, name: 'Jacky Wong', position: 'System Engineer', image: '/avatars/HK - Jacky Wong.png' },
        { id: 24, name: 'John Wong', position: 'System Engineer', image: '/avatars/HK - John Wong.png' },
      ],
      clients: [
        {
          id: 159,
          name: 'Zuma',
          type: 'Recurring',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: [''],
        },
        {
          id: 160,
          name: 'LPM',
          type: 'Recurring',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: [''],
        },
        {
          id: 161,
          name: 'Cathay Vest',
          type: 'Recurring',
          invoiceText: '',
          coreServices: [''],
          engineeringTeam: [''],
        },
      ],
    },
    {
      id: 26,
      name: 'Casey Tang',
      position: 'Sales Admin',
    company: 'FunctionEight',
      image: '/avatars/HK - Casey Tang.png',
      employees: [
      ],
      clients: [
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
