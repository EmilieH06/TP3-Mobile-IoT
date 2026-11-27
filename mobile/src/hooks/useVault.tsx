import { VaultContext } from "@/contexts/VaultContext";
import { useContext } from "react";

export function useVault() {
  const context = useContext(VaultContext);

  if (!context) {
    throw new Error("useVault doit être utilisé à l'intérieur de Provider");
  }
  return context;
}
