import { useAuth } from "@/hooks/useAuth";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  orderBy,
  limit,
} from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { db } from "../../firebaseConfig";
import { Vault, VaultContextType, VaultState } from "../types/vault";

export const VaultContext = createContext<VaultContextType | undefined>(
  undefined,
);

export function VaultContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { appUser } = useAuth();

  const [vaults, setVault] = useState<Vault[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadVault = async () => {
      try {
        if (!appUser || !appUser.id) {
          setIsLoading(false);
          return;
        }
        setIsLoading(true);

        const q = query(
          collection(db, "coffres"),
          where("userId", "==", appUser.id),
        );

        const querySnapshot = await getDocs(q);

        const fetchedVault = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Vault[];

        setVault(fetchedVault);
      } catch {
        Alert.alert("An error occured during loading");
      } finally {
        setIsLoading(false);
      }
    };

    loadVault();
  }, [appUser]);

  function validateVault(
    name: string,
    code: string,
    tempMin: number,
    tempMax: number
  ) {
    if (!name.trim()) {
      throw new Error("Le nom est obligatoire.");
    }

    //https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number
    if (!/^\d{4}$/.test(code)) {
      throw new Error("Le code doit contenir exactement 4 chiffres.");
    }

    //https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number
    if (!Number.isFinite(tempMin) || !Number.isFinite(tempMax)) {
      throw new Error("Les températures doivent être des nombres.");
    }

    if (tempMin >= tempMax) {
      throw new Error("TempMin doit être inférieur à tempMax.");
    }
  }

  async function addVault(id: string, name: string, code: string, tempMin: number, tempMax: number) {
    try {
      if (appUser && appUser.id) {

        if (!id.trim()) {
          throw new Error("Id invalide.");
        }

        validateVault(name, code, tempMin, tempMax);

        const vaultRef = doc(db, "coffres", id);

        const vaultExists = await getDoc(vaultRef);

        if (vaultExists.exists()) {
          throw new Error("Cet identifiant de coffre existe déjà.");
        }

        const vaultData: Vault = {
          name: name.trim(),
          code,
          tempMin,
          tempMax,
          state: VaultState.Ouvert,
          userId: appUser.id,
        };

        await setDoc(vaultRef, vaultData);

        const newVault: Vault = {
          id,
          ...vaultData,
        };

        setVault((currentVault) => [...currentVault, newVault]);
      }
    } catch {
      Alert.alert("An unexpected error occured");
    }
  }

  async function modifyVault(vaultId: string, name: string, code: string, tempMin: number, tempMax: number) {
    try {
      if (appUser && appUser.id) {
        validateVault(name, code, tempMin, tempMax);

        const vaultRef = doc(db, "coffres", vaultId);

        const vaultDoc = await getDoc(vaultRef);

        if (!vaultDoc.exists() || vaultDoc.data().userId !== appUser.id) {
          throw new Error("Coffre introuvable.");
        }

        const updatedData = {
          name: name.trim(),
          code,
          tempMin,
          tempMax,
        };

        await updateDoc(vaultRef, updatedData);

        const updatedVaults = vaults.map((vault) => {
          if (vault.id === vaultId) {
            return { ...vault, ...updatedData };
          }

          return vault;
        });

        setVault(updatedVaults);
      }
    } catch {
      Alert.alert("An unexpected error occured");
    }
  }

  async function getTemperatures(vaultId: string) {
    try {
      if (!appUser?.id) {
        throw new Error("Vous n'êtes pas connecté.");
      }

      const vault = vaults.find((v) => v.id === vaultId);

      if (!vault) {
        throw new Error("Coffre introuvable.");
      }

      const q = query(
        collection(db, "mesures"),
        where("vaultId", "==", vaultId),
        orderBy("time", "desc"),
        limit(20)
      );

      const querySnapshot = await getDocs(q);

      const temperatures = querySnapshot.docs.map((document) => {
        const data = document.data();

        return {
          id: document.id,
          vaultId: data.vaultId,
          temperature: data.temperature,
          time: data.time,
          outOfRange: data.temperature < vault.tempMin! || data.temperature > vault.tempMax!,
        };
      });
      return temperatures;

    } catch {
      Alert.alert("Impossible de récupérer les températures.");
      return [];
    }
  }

  return (
    <VaultContext.Provider
      value={{
        isLoading,
        vaults,
        addVault,
        modifyVault,
        getTemperatures,
      }}
    >
      {children}
    </VaultContext.Provider>
  );
}
