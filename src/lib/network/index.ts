import { Config } from "../types";

export const isNetworkSupported = async (
  payload: {
    chainId: bigint;
  },
  config: Config
): Promise<boolean> => {
  const supportedNetworks = await getSupportedNetworks(config);
  return supportedNetworks.includes(payload.chainId.toString());
};

export const getSupportedNetworks = async (
  config: Config
): Promise<string[]> => {
  // Check for environment variable first
  const supportedChainIds = process.env.SUPPORTED_CHAIN_IDS;
  if (supportedChainIds) {
    // Mock the API response structure
    const mockResponse = {
      relays: supportedChainIds.split(",").map((id) => id.trim()),
    };
    return mockResponse.relays;
  }

  // Fallback to empty array if no environment variable
  // Note: config parameter preserved for API compatibility
  console.log(
    "No SUPPORTED_CHAIN_IDS environment variable found, config:",
    config
  );
  return [];
};
