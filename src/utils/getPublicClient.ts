import { PublicClient, publicActions } from "viem";

import { PublicOrWalletClient } from "../lib/types";

export const getPublicClient = (client: PublicOrWalletClient): PublicClient => {
  let publicClient: PublicClient;
  if (client.type === "walletClient") {
    publicClient = client.extend(publicActions) as PublicClient;
  } else {
    // publicClient
    publicClient = client as PublicClient;
  }

  return publicClient;
};
