export enum VaultState {
  Ouvert = "Ouvert",
  Ferme = "Fermé"
}

export interface Temperature {
  id: string;
  vaultId: string;
  temperature: number;
  time: string;
  outOfRange: boolean;
}

export interface Vault {
  id?: string;
  name: string;
  state: VaultState;
  code: string;
  temperature?: number;
  tempMin?: number;
  tempMax?: number;
  time?: string;
  userId: string;
}

export type VaultContextType = {
  isLoading: boolean;
  vaults: Vault[];
  addVault: (id: string, name: string, code: string, tempMin: number, tempMax: number) => void;
  modifyVault: (vaultId: string, name: string, code: string, tempMin: number, tempMax: number) => void;
  getTemperatures: (vaultId: string) => Promise<Temperature[]>;
};
