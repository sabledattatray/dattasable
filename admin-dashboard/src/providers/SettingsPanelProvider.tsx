import { PropsWithChildren, createContext, useContext, useState } from 'react';

export interface SettingsPanelConfig {
  showSettingPanelButton: boolean;
  openSettingPanel: boolean;
}

interface SettingsPanelContextInterFace {
  settingsPanelConfig: SettingsPanelConfig;
  setSettingsPanelConfig: (config: Partial<SettingsPanelConfig>) => void;
}

export const SettingsPanelContext = createContext({} as SettingsPanelContextInterFace);

const SettingsPanelProvider = ({ children }: PropsWithChildren) => {
  const [settingsPanelConfig, setSettingsPanelConfig] = useState<SettingsPanelConfig>({
    showSettingPanelButton: true,
    openSettingPanel: false,
  });

  const updateSettingsPanelConfig = (config: Partial<SettingsPanelConfig>) => {
    setSettingsPanelConfig((prev) => ({
      ...prev,
      ...config,
    }));
  };

  return (
    <SettingsPanelContext.Provider
      value={{
        settingsPanelConfig,
        setSettingsPanelConfig: updateSettingsPanelConfig,
      }}
    >
      {children}
    </SettingsPanelContext.Provider>
  );
};

export default SettingsPanelProvider;

export const useSettingsPanelContext = () => useContext(SettingsPanelContext);
