import { WalletClient } from "viem";

import {
  CallWithSyncFeeERC2771PayloadToSign,
  SponsoredCallERC2771PayloadToSign,
  SponsoredCallConcurrentERC2771PayloadToSign,
  CallWithSyncFeeConcurrentERC2771PayloadToSign,
} from "../lib/erc2771/types";

export const signTypedDataV4 = async (
  client: WalletClient,
  payload:
    | SponsoredCallERC2771PayloadToSign
    | CallWithSyncFeeERC2771PayloadToSign
    | SponsoredCallConcurrentERC2771PayloadToSign
    | CallWithSyncFeeConcurrentERC2771PayloadToSign
): Promise<string> => {
  if (!client.account) {
    throw new Error(
      "Account not found on client. Please, provide an account during the client creation."
    );
  }

  return await client.signTypedData({
    account: client.account,
    domain: payload.domain,
    types: payload.types,
    message: payload.message,
    primaryType: payload.primaryType,
  });
  // if (isLocalSigner(client)) {
  //   return await client.signTypedData({
  //     domain: payload.domain,
  //     types: payload.types,
  //     message: payload.message,
  //   });
  // }
  // // Magic Connect accepts payload as an object
  // if ((signerOrProvider.provider as unknown as { isMagic: boolean }).isMagic) {
  //   return await signerOrProvider.send(SIGN_TYPED_DATA_V4, [address, payload]);
  // }
  // const signature = await client.send(SIGN_TYPED_DATA_V4, [
  //   address,
  //   JSON.stringify(payload),
  // ]);

  // // Support both versions of `eth_sign` responses
  // return signature.replace(/00$/, "1b").replace(/01$/, "1c");
};
