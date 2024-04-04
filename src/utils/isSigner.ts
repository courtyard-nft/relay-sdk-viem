import { PublicOrWalletClient } from "../lib/types";

export const isWalletClient = (client: PublicOrWalletClient): boolean => {
  return client.type === "walletClient";
};
