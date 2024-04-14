import { parseAbi } from "viem";

import { USER_NONCE_ABI } from "../constants";
import { Config, PublicOrWalletClient } from "../lib/types";
import { ERC2771Type } from "../lib/erc2771/types";

import { getGelatoRelayERC2771Address } from "./relayAddress";
import { getPublicClient } from "./getPublicClient";

export const getUserNonce = async (
  payload: {
    account: string;
    type: ERC2771Type;
    client: PublicOrWalletClient;
  },
  config: Config
): Promise<bigint> => {
  const { account, type, client } = payload;

  const chainId = BigInt(await client.getChainId());

  const publicClient = getPublicClient(client);

  const nonce = await publicClient.readContract({
    abi: parseAbi(USER_NONCE_ABI),
    address: getGelatoRelayERC2771Address(
      { chainId, type },
      config
    ) as `0x${string}`,
    functionName: "userNonce",
    args: [account],
  });

  return nonce as bigint;
};
