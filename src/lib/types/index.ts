import { Hex, WalletClient, PublicClient, Address } from "viem";
import { ClientOptions } from "isomorphic-ws";

export enum RelayCall {
  CallWithSyncFee,
  CallWithSyncFeeERC2771,
  SponsoredCall,
  SponsoredCallERC2771,
}

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type RelayRequestOptions = {
  gasLimit?: bigint;
  retries?: number;
};

export type ConcurrencyOptions = {
  isConcurrent: boolean;
};

export type ApiKey = {
  sponsorApiKey: string;
};

export type JwtToken = {
  jwtToken: string;
};

export type RelayResponse = {
  taskId: string;
};

export type EIP712Domain = {
  name: string;
  version: string;
  chainId: number;
  verifyingContract: Address;
};

export const EIP712_DOMAIN_TYPE_DATA = {
  EIP712Domain: [
    { name: "name", type: "string" },
    { name: "version", type: "string" },
    { name: "chainId", type: "uint256" },
    { name: "verifyingContract", type: "address" },
  ],
};

export type BaseRelayParams = {
  chainId: bigint;
  target: string;
  data: Hex;
};

export type BaseCallWithSyncFeeParams = {
  feeToken: string;
  isRelayContext?: boolean;
};

export type Config = {
  url: string;
  websocketUrl: string;
  websocketConfig: ClientOptions;
  contract: {
    relayERC2771: string;
    relay1BalanceERC2771: string;
    relayERC2771zkSync: string;
    relayERC2771Abstract: string;
    relay1BalanceERC2771zkSync: string;
    relay1BalanceERC2771Abstract: string;
    relayConcurrentERC2771: string;
    relay1BalanceConcurrentERC2771: string;
    relayConcurrentERC2771zkSync: string;
    relayConcurrentERC2771Abstract: string;
    relay1BalanceConcurrentERC2771zkSync: string;
    relay1BalanceConcurrentERC2771Abstract: string;
  };
};

export type SafeRequestPayload<T> = {
  [K in keyof T]: T[K] extends bigint
    ? string
    : T[K] extends bigint | undefined
    ? string | undefined
    : T[K] extends object
    ? SafeRequestPayload<T[K]>
    : T[K];
};

export type PublicOrWalletClient = PublicClient | WalletClient;
