import React from 'react';

const UserSearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="bg-card-light p-6 rounded-xl shadow-sm mb-8">
      <div className="relative">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-subtext-light">search</span>
        <input
          className="w-full pl-10 pr-4 py-2 border border-border-light rounded-lg bg-background-light text-text-light focus:ring-primary focus:border-primary"
          placeholder="Buscar usuarios"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default UserSearchBar;
