import React from "react";

type GlobalContextType = {
  globalState: unknown;
  setGlobalState: React.Dispatch<React.SetStateAction<unknown>>;
};

const GlobalContext = React.createContext<GlobalContextType>({
  globalState: {},
  setGlobalState: () => {},
});

export const useGlobalContext = () => React.useContext(GlobalContext);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [globalState, setGlobalState] = React.useState<unknown>({});

  const contextValue = React.useMemo(
    () => ({ globalState, setGlobalState }),
    [globalState, setGlobalState]
  );

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};
