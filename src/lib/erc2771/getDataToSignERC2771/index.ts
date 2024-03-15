import { WalletClient } from "viem";

import { isConcurrentRequest } from "../../../utils";
import { isNetworkSupported } from "../../network";
import { Config } from "../../types";
import {
  CallWithERC2771Request,
  ERC2771Type,
  CallWithConcurrentERC2771Request,
  PayloadToSign,
  SequentialPayloadToSign,
  ConcurrentPayloadToSign,
} from "../types";
import { populatePayloadToSign } from "../utils";

export async function getDataToSignERC2771(
  payload: {
    request: CallWithERC2771Request;
    type: ERC2771Type.CallWithSyncFee | ERC2771Type.SponsoredCall;
    client?: WalletClient;
  },
  config: Config
): Promise<SequentialPayloadToSign>;

export async function getDataToSignERC2771(
  payload: {
    request: CallWithConcurrentERC2771Request;
    type:
      | ERC2771Type.ConcurrentCallWithSyncFee
      | ERC2771Type.ConcurrentSponsoredCall;
    client?: WalletClient;
  },
  config: Config
): Promise<ConcurrentPayloadToSign>;

export async function getDataToSignERC2771(
  payload: {
    request: CallWithERC2771Request | CallWithConcurrentERC2771Request;
    type: ERC2771Type;
    client?: WalletClient;
  },
  config: Config
): Promise<PayloadToSign>;

export async function getDataToSignERC2771(
  payload: {
    request: CallWithERC2771Request | CallWithConcurrentERC2771Request;
    type: ERC2771Type;
    client?: WalletClient;
  },
  config: Config
): Promise<PayloadToSign> {
  try {
    const { request, client } = payload;

    const { chainId } = request;
    const isSupported = await isNetworkSupported({ chainId }, config);
    if (!isSupported) {
      throw new Error(`Chain id [${chainId.toString()}] is not supported`);
    }

    if (isConcurrentRequest(request)) {
      const type = payload.type as
        | ERC2771Type.ConcurrentCallWithSyncFee
        | ERC2771Type.ConcurrentSponsoredCall;

      const { struct, typedData } = await populatePayloadToSign(
        {
          request,
          type,
          client,
        },
        config
      );

      return {
        struct,
        typedData,
      };
    } else {
      const type = payload.type as
        | ERC2771Type.CallWithSyncFee
        | ERC2771Type.SponsoredCall;

      const { struct, typedData } = await populatePayloadToSign(
        { request, type, client },
        config
      );

      return {
        struct,
        typedData,
      };
    }
  } catch (error) {
    const errorMessage = (error as Error).message;
    throw new Error(
      `GelatoRelaySDK/getDataToSignERC2771: Failed with error: ${errorMessage}`
    );
  }
}
