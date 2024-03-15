import { WalletClient } from "viem";

import {
  CallWithConcurrentERC2771Request,
  CallWithERC2771Request,
  ConcurrentPayloadToSign,
  ERC2771Type,
  PayloadToSign,
  SequentialPayloadToSign,
} from "../types";
import { Config } from "../../types";
import {
  isConcurrentRequest,
  isLocalSigner,
  populateOptionalUserParameters,
} from "../../../utils";

import { mapRequestToStruct } from "./mapRequestToStruct";
import { getPayloadToSign } from "./getPayloadToSign";
import { safeTransformStruct } from "./safeTransformStruct";

export async function populatePayloadToSign(
  payload: {
    request: CallWithConcurrentERC2771Request;
    type:
      | ERC2771Type.ConcurrentCallWithSyncFee
      | ERC2771Type.ConcurrentSponsoredCall;
    client?: WalletClient;
  },
  config: Config
): Promise<ConcurrentPayloadToSign>;

export async function populatePayloadToSign(
  payload: {
    request: CallWithERC2771Request;
    type: ERC2771Type.CallWithSyncFee | ERC2771Type.SponsoredCall;
    client?: WalletClient;
  },
  config: Config
): Promise<SequentialPayloadToSign>;

export async function populatePayloadToSign(
  payload: {
    request: CallWithConcurrentERC2771Request | CallWithERC2771Request;
    type: ERC2771Type;
    client?: WalletClient;
  },
  config: Config
): Promise<PayloadToSign> {
  const { request, client } = payload;
  if (isConcurrentRequest(request)) {
    const type = payload.type as
      | ERC2771Type.ConcurrentCallWithSyncFee
      | ERC2771Type.ConcurrentSponsoredCall;
    const parametersToOverride = await populateOptionalUserParameters(
      {
        request,
        type,
        client,
      },
      config
    );

    const struct = await mapRequestToStruct(request, parametersToOverride);

    const safeStruct = safeTransformStruct(struct);

    const typedData = getPayloadToSign(
      {
        struct: safeStruct,
        type,
        isSigner: client ? isLocalSigner(client) : undefined,
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
    const parametersToOverride = await populateOptionalUserParameters(
      {
        request,
        type,
        client,
      },
      config
    );

    const struct = await mapRequestToStruct(request, parametersToOverride);

    const safeStruct = safeTransformStruct(struct);

    const typedData = getPayloadToSign(
      {
        struct: safeStruct,
        type,
        isSigner: client ? isLocalSigner(client) : undefined,
      },
      config
    );

    return {
      struct,
      typedData,
    };
  }
}
