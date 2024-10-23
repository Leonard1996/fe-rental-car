import { createContext, useContext, useState } from 'react';

const LoadingContext = createContext({ loading: false, setIsLoading: () => {} });

export const LoadingProvider = ({ children }) => {
  const [loading, setIsLoading] = useState(false);

  return <LoadingContext.Provider value={{ loading, setIsLoading }}>{children}</LoadingContext.Provider>;
};

export const useLoading = () => useContext(LoadingContext);
