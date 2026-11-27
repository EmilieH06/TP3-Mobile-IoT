export enum VaultState {
  Ouvert = "Ouvert",
  Ferme = "Fermé"
}

export interface Vault {
  id: string;
  name: string;
  state: VaultState;
  code: number;
  temperature?: number;
  tempMin?: number;
  tempMax?: number;
  time?: string;
  userId: string;
}

export type VaultContextType = {
  isLoading: boolean;
  vaults: Vault[];
  addVault: (id: string, name: string, code: number, tempMin: number, tempMax: number) => void;
  modifyVault: (vaultId: string) => void;
  detailVault: (vaultId: string) => void;
};
