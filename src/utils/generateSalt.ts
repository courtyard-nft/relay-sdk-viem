import {
  encodeAbiParameters,
  parseAbiParameters,
  keccak256,
  toBytes,
} from "viem";

export const generateSalt = (): string => {
  const randomSeed = Math.floor(Math.random() * 1000000);
  const dataEncoded = encodeAbiParameters(
    parseAbiParameters("uint256, uint256"),
    [BigInt(randomSeed), BigInt(new Date().getMilliseconds())]
  );
  return keccak256(toBytes(dataEncoded));
};
