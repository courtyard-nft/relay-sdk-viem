import { PublicClient, publicActions } from "viem";

import { PublicOrWalletClient } from "../lib/types";

export const getPublicClient = (client: PublicOrWalletClient): PublicClient => {
  const publicClient: PublicClient = client.extend(
    publicActions
  ) as PublicClient;

  return publicClient;
};
