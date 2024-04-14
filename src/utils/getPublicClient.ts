import { PublicClient, publicActions } from "viem";

import { PublicOrWalletClient } from "../lib/types";

import { isWalletClient } from "./isWalletClient";

export const getPublicClient = (client: PublicOrWalletClient): PublicClient => {
  if (isWalletClient(client)) {
    return client.extend(publicActions) as PublicClient;
  }
  return client;
};
