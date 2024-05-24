import React, { createContext, useContext, useState, useEffect } from 'react';

const CustomTagsContext = createContext();

export const useCustomTags = () => useContext(CustomTagsContext);

export const CustomTagsProvider = ({ children }) => {
  const [customTags, setCustomTags] = useState(() => {
    const localData = localStorage.getItem('customTags');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('customTags', JSON.stringify(customTags));
  }, [customTags]);

  return (
    <CustomTagsContext.Provider value={{ customTags, setCustomTags }}>
      {children}
    </CustomTagsContext.Provider>
  );
};
