import { zeroAddress } from "viem";
export const GELATO_RELAY_URL = process.env.GELATO_RELAY_URL as string;

export const SIGN_TYPED_DATA_V4 = "eth_signTypedData_v4";

export const DEFAULT_INTERNAL_ERROR_MESSAGE = "Internal Error";

export const DEFAULT_DEADLINE_GAP = 86_400; //24H
export const USER_NONCE_ABI = [
  "function userNonce(address account) external view returns (uint256)",
];
export const GELATO_RELAY_ERC2771_ADDRESS = zeroAddress;  
export const GELATO_RELAY_1BALANCE_ERC2771_ADDRESS = zeroAddress;

export const GELATO_RELAY_ERC2771_ZKSYNC_ADDRESS = zeroAddress;
export const GELATO_RELAY_1BALANCE_ERC2771_ZKSYNC_ADDRESS = zeroAddress;

export const GELATO_RELAY_ERC2771_ABSTRACT_ADDRESS = zeroAddress;
export const GELATO_RELAY_1BALANCE_ERC2771_ABSTRACT_ADDRESS = zeroAddress;

export const GELATO_RELAY_CONCURRENT_ERC2771_ADDRESS = process.env.GELATO_RELAY_CONCURRENT_ERC2771_ADDRESS as string;
export const GELATO_RELAY_1BALANCE_CONCURRENT_ERC2771_ADDRESS = zeroAddress;

export const GELATO_RELAY_CONCURRENT_ERC2771_ZKSYNC_ADDRESS = zeroAddress;
export const GELATO_RELAY_1BALANCE_CONCURRENT_ERC2771_ZKSYNC_ADDRESS = zeroAddress;

export const GELATO_RELAY_CONCURRENT_ERC2771_ABSTRACT_ADDRESS = zeroAddress;
export const GELATO_RELAY_1BALANCE_CONCURRENT_ERC2771_ABSTRACT_ADDRESS = zeroAddress;
