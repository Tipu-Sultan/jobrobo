// SortingContext.js
import React, { createContext, useContext, useState } from 'react';

const SortingContext = createContext();

export const useSorting = () => useContext(SortingContext);

export const SortingProvider = ({ children }) => {
  const [sortOrder, setSortOrder] = useState('asc'); // Default sorting direction


  return (
    <SortingContext.Provider value={{ sortOrder, setSortOrder }}>
      {children}
    </SortingContext.Provider>
  );
};
