import { DEFAULT_DEADLINE_GAP } from "../constants";
import {
  CallWithConcurrentERC2771Request,
  CallWithConcurrentERC2771RequestOptionalParameters,
  CallWithERC2771Request,
  CallWithERC2771RequestOptionalParameters,
  ERC2771Type,
} from "../lib/erc2771/types";
import { Config, PublicOrWalletClient } from "../lib/types";

import { calculateDeadline } from "./calculateDeadline";
import { getUserNonce } from "./getUserNonce";
import { isConcurrentRequest } from "./isConcurrentRequest";
import { generateSalt } from "./generateSalt";

export async function populateOptionalUserParameters(
  payload: {
    request: CallWithConcurrentERC2771Request;
    type:
      | ERC2771Type.ConcurrentCallWithSyncFee
      | ERC2771Type.ConcurrentSponsoredCall;
    client?: PublicOrWalletClient;
  },

  config: Config
): Promise<Partial<CallWithConcurrentERC2771RequestOptionalParameters>>;

export async function populateOptionalUserParameters(
  payload: {
    request: CallWithERC2771Request;
    type: ERC2771Type.CallWithSyncFee | ERC2771Type.SponsoredCall;
    client?: PublicOrWalletClient;
  },

  config: Config
): Promise<Partial<CallWithERC2771RequestOptionalParameters>>;

export async function populateOptionalUserParameters(
  payload: {
    request: CallWithConcurrentERC2771Request | CallWithERC2771Request;
    type: ERC2771Type;
    client?: PublicOrWalletClient;
  },

  config: Config
): Promise<
  Partial<
    | CallWithConcurrentERC2771RequestOptionalParameters
    | CallWithERC2771RequestOptionalParameters
  >
> {
  if (isConcurrentRequest(payload.request)) {
    const { request } = payload;
    const parametersToOverride: Partial<CallWithConcurrentERC2771RequestOptionalParameters> =
      {};
    if (!request.userDeadline) {
      parametersToOverride.userDeadline =
        calculateDeadline(DEFAULT_DEADLINE_GAP);
    }
    if (!request.userSalt) {
      parametersToOverride.userSalt = generateSalt();
    }
    return parametersToOverride;
  } else {
    const { type, client, request } = payload;
    const parametersToOverride: Partial<CallWithERC2771RequestOptionalParameters> =
      {};
    if (!request.userDeadline) {
      parametersToOverride.userDeadline =
        calculateDeadline(DEFAULT_DEADLINE_GAP);
    }
    if (request.userNonce === undefined) {
      if (!client) {
        throw new Error("Missing client.");
      }
      const chainId = BigInt(await client.getChainId());
      if (request.chainId !== chainId) {
        throw new Error(
          `Request and provider chain id mismatch. Request: [${request.chainId.toString()}], provider: [${chainId.toString()}]`
        );
      }
      parametersToOverride.userNonce = await getUserNonce(
        {
          account: request.user as string,
          type,
          client,
        },
        config
      );
    }

    return parametersToOverride;
  }
}
