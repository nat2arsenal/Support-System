import { useState } from 'react';

import {
  clientTierOptions,
  clientTypeOptions,
  defaultClientFilters,
  serviceDeskOptions,
} from '../clientFilters';

export default function ClientFilterDropdown({ ariaLabel, filteredClientCount, filters, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const updateFilter = (key, value) => {
    onChange({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    onChange(defaultClientFilters);
  };

  return (
    <div className="client-filter-dropdown">
      <div className="client-filter-dropdown-header">
        <button
          className={`client-filter-toggle ${isOpen ? 'active' : ''}`}
          type="button"
          aria-expanded={isOpen}
          aria-label={ariaLabel}
          onClick={toggleMenu}
        >
          <span>Filters</span>
          <span className="filter-chevron" aria-hidden="true">
            v
          </span>
        </button>
        <div className="client-count">
          <span>Count:</span>
          <span className="filter-count">{filteredClientCount}</span>
          </div>
      </div>

      {isOpen && (
        <div className="client-filter-menu">
          <div className="filter-field">
            <div className="compact-filter-group" role="group" aria-label="Filter clients by type">
              {clientTypeOptions.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  className={`filter-chip ${
                    filters.type === type.value ? 'active' : ''
                  } ${type.className ?? ''}`}
                  aria-pressed={filters.type === type.value}
                  onClick={() => updateFilter('type', type.value)}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-field">
            <div className="compact-filter-group" role="group" aria-label="Filter clients by tier">
              {clientTierOptions.map((tier) => (
                <button
                  key={tier.value}
                  type="button"
                  className={`filter-chip tier-chip ${
                    filters.tier === tier.value ? 'active' : ''
                  } ${tier.value === 'All' ? 'all-tiers' : ''}`}
                  style={tier.color ? { '--tier-color': tier.color } : undefined}
                  aria-pressed={filters.tier === tier.value}
                  onClick={() => updateFilter('tier', tier.value)}
                >
                  {tier.color && <span className="tier-dot" aria-hidden="true"></span>}
                  {tier.shortLabel}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-field">
            <div
              className="compact-filter-group"
              role="group"
              aria-label="Filter clients by Service Desk core service"
            >
              {serviceDeskOptions.map((service) => (
                <button
                  key={service.value}
                  type="button"
                  className={`filter-chip ${
                    filters.serviceDesk === service.value ? 'active' : ''
                  } ${service.value === 'All' ? '' : 'service-chip'}`}
                  aria-pressed={filters.serviceDesk === service.value}
                  onClick={() => updateFilter('serviceDesk', service.value)}
                >
                  {service.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-menu-actions">
            <button className="filter-clear-button" type="button" onClick={clearFilters}>
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
