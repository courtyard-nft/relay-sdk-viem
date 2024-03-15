import { WalletClient } from "viem";

export const isLocalSigner = (client: WalletClient): boolean => {
  return client?.account?.type === "local";
};
