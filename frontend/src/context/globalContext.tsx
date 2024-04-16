import React from "react";

type GlobalStateType = {
  codeToConvert: string;
  convertedCode: string;
  selectedMode: string;
  isSubmitted: boolean;
  isModalOpen: boolean;
};

type GlobalActionsType = {
  setCodeToConvert: React.Dispatch<React.SetStateAction<string>>;
  setConvertedCode: React.Dispatch<React.SetStateAction<string>>;
  setSelectedMode: React.Dispatch<React.SetStateAction<string>>;
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const GlobalStateContext = React.createContext<GlobalStateType | undefined>(
  undefined
);

const GlobalActionsContext = React.createContext<GlobalActionsType | undefined>(
  undefined
);

export const useGlobalState = () => {
  const context = React.useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalProvider");
  }
  return context;
};

export const useGlobalActions = () => {
  const context = React.useContext(GlobalActionsContext);
  if (!context) {
    throw new Error("useGlobalActions must be used within a GlobalProvider");
  }
  return context;
};

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [codeToConvert, setCodeToConvert] = React.useState<string>("");
  const [convertedCode, setConvertedCode] = React.useState<string>("");
  const [selectedMode, setSelectedMode] = React.useState<string>("ctt");
  const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

  const stateValue = React.useMemo(
    () => ({
      codeToConvert,
      convertedCode,
      selectedMode,
      isSubmitted,
      isModalOpen,
    }),
    [codeToConvert, convertedCode, selectedMode, isSubmitted, isModalOpen]
  );

  const actionsValue = React.useMemo(
    () => ({
      setCodeToConvert,
      setConvertedCode,
      setSelectedMode,
      setIsSubmitted,
      setIsModalOpen,
    }),
    [
      setCodeToConvert,
      setConvertedCode,
      setSelectedMode,
      setIsSubmitted,
      setIsModalOpen,
    ]
  );

  return (
    <GlobalStateContext.Provider value={stateValue}>
      <GlobalActionsContext.Provider value={actionsValue}>
        {children}
      </GlobalActionsContext.Provider>
    </GlobalStateContext.Provider>
  );
};
