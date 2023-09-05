import React from "react";
import {
  configureChains,
  createConfig,
  WagmiConfig,
  mainnet,
  sepolia,
} from "wagmi";
import { polygonMumbai } from "wagmi/chains";

import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import publicProvider from "@/utils/publicProvider";

type WagmiProviderType = {
  children: React.ReactNode;
};
const chains = [polygonMumbai, mainnet, sepolia];

const { publicClient } = configureChains(chains, [publicProvider()]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi.sh",
        jsonRpcUrl: "https://eth-mainnet.alchemyapi.io/v2/yourAlchemyId",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
        metadata: {
          name: "Rank Bloc",
          description: "my wagmi app",
          url: "https://wagmi.sh",
          icons: ["https://wagmi.sh/icon.png"],
        },
      },
    }),
  ],
  publicClient,
});

const WagmiProvider = ({ children }: WagmiProviderType) => {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
    </>
  );
};

export default WagmiProvider;
