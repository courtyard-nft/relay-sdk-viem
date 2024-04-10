import { WalletClient } from "viem";

import { PublicOrWalletClient } from "../lib/types";

export const isWalletClient = (
  client: PublicOrWalletClient
): client is WalletClient => {
  return client.type === "walletClient";
};
