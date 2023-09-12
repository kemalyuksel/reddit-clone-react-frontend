import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const FilterCard = ({ activeFilter, handleFilterClick }) => {
  const filters = [
    { id: 'all', icon: 'rocket', text: 'Best' },
    { id: 'hot', icon: 'fa-solid fa-fire', text: 'Hot' },
    { id: 'new', icon: 'fa-solid fa-sun', text: 'New' },
    { id: 'top', icon: 'fa-solid fa-arrow-trend-up', text: 'Top' },
  ];

  return (
    <div className="filter-card">
      {filters.map(filter => (
        <div
          key={filter.id}
          className={`filter-icon ${activeFilter === filter.id ? 'active' : ''}`}
          onClick={() => handleFilterClick(filter.id)}>
          <FontAwesomeIcon icon={filter.icon} />
          <span className="filter-text">{filter.text}</span>
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
