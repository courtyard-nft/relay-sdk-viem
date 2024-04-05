import { PublicOrWalletClient } from "../lib/types";
import {
  CallWithSyncFeeERC2771PayloadToSign,
  SponsoredCallERC2771PayloadToSign,
  SponsoredCallConcurrentERC2771PayloadToSign,
  CallWithSyncFeeConcurrentERC2771PayloadToSign,
} from "../lib/erc2771/types";

export const signTypedDataV4 = async (
  client: PublicOrWalletClient,
  payload:
    | SponsoredCallERC2771PayloadToSign
    | CallWithSyncFeeERC2771PayloadToSign
    | SponsoredCallConcurrentERC2771PayloadToSign
    | CallWithSyncFeeConcurrentERC2771PayloadToSign
): Promise<string> => {
  if (!client.account) {
    throw new Error(
      "The provided client is not a wallet client, or account not found on the client. Please, provide an account during the client creation."
    );
  }

  const signature = await client.signTypedData({
    account: client.account,
    domain: payload.domain,
    types: payload.types,
    message: payload.message,
    primaryType: payload.primaryType,
  });

  // Support both versions of `eth_sign` responses
  return signature.replace(/00$/, "1b").replace(/01$/, "1c");
};
