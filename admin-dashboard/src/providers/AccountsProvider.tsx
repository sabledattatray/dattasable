'use client';
import { Dispatch, PropsWithChildren, SetStateAction, createContext, use, useState } from 'react';
import { personalInfoData } from 'data/account/personal-info';
import { PersonalInfo } from 'types/accounts';

const STORAGE_KEY = 'dattasable-personal-info';

/** Load saved info from localStorage, falling back to the static defaults */
const loadPersonalInfo = (): PersonalInfo => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return { ...personalInfoData, ...JSON.parse(stored) };
  } catch {
    /* ignore parse errors */
  }
  return personalInfoData;
};

/** Persist updated info to localStorage */
const savePersonalInfo = (info: PersonalInfo) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(info));
  } catch {
    /* ignore write errors */
  }
};

interface AccountsContextInterface {
  personalInfo: PersonalInfo;
  setPersonalInfo: Dispatch<SetStateAction<PersonalInfo>>;
  updatePersonalInfo: (updates: Partial<PersonalInfo>) => void;
}

export const AccountsContext = createContext({} as AccountsContextInterface);

const AccountsProvider = ({ children }: PropsWithChildren) => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(loadPersonalInfo);

  const updatePersonalInfo = (updates: Partial<PersonalInfo>) => {
    setPersonalInfo((prev) => {
      const updated = { ...prev, ...updates };
      savePersonalInfo(updated);
      return updated;
    });
  };

  return (
    <AccountsContext value={{ personalInfo, setPersonalInfo, updatePersonalInfo }}>
      {children}
    </AccountsContext>
  );
};

export const useAccounts = () => use(AccountsContext);

export default AccountsProvider;
