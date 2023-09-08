"use client";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { setCookie } from "cookies-next";
import { useAccount, useConnect, useSignMessage } from "wagmi";
import { disconnect } from "@wagmi/core";

import { TfiAngleRight } from "react-icons/tfi";
import Image from "next/image";

import Modal from "./ui/Modal";

import metamaskLogo from "../../public/wolf.svg";
import coinbaseLogo from "../../public/coinbase-logo.svg";
import walletConnectLogo from "../../public/wallet-connect-logo.svg";
import chrome from "../../public/chrome.svg";
import playStore from "../../public/Google_Play.svg";
import appStore from "../../public/App_Store.svg";
import QRForMobile from "./ui/QRForMobile";
import createUser from "@/requests/user/createUser";
import { setCookieClient, getCookieClient } from "@/utils/setCookies";
import getNonce from "@/requests/user/getNonce";
import AuthenticateUser from "@/requests/user/authenticate";

const Connector = ({ setIsOpen }: { setIsOpen: (value: boolean) => void }) => {
  const [isGettingStarted, setIsGettingStarted] = useState(false);
  const [isPlayStore, setIsPlayStore] = useState(false);
  const [isAppStore, setIsAppStore] = useState(false);

  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect({
      async onSuccess(data) {
        try {
          console.log("on wallet success running");
          console.log(data.account);
          await handleSignupOrLogin(data.account);
        } catch (err) {}
      },
    });

  // const {
  //   connector: activeConnector,
  //   isConnected,
  //   address,
  // } = useAccount({
  //   onConnect({ address, connector, isReconnected }) {},
  // });

  const { data, isError, isSuccess, signMessageAsync } = useSignMessage();

  const isWalletAvailable = (walletType: string): boolean => {
    if (walletType === "metamask") {
      return typeof (window as any).ethereum !== "undefined";
    } else if (walletType === "coinbase") {
      return (
        typeof (window as any).ethereum &&
        (window as any).ethereum?.isCoinbaseWallet !== undefined
      );
    } else {
      return false; // Default to false for unknown wallet types
    }
  };

  const handleAuthenticate = async (nonce: string, address: string) => {
    // const message = `I affix my digital seal to verify address for RankBloc.

    // NONCE: ${nonce}
    // `;
    console.log(address);
    const message = `Welcome to RankBloc!
    Click to sign in and accept the RankBloc Terms of Service (https://rankbloc.io/tos) and Privacy Policy (https://rankbloc.io/privacy).
    This request will not trigger a blockchain transaction or cost any gas fees.
    Your authentication status will reset after 24 hours.
    
    Nonce:
    ${nonce}`;

    console.log("authentication is currently going on");

    try {
      const signature = await signMessageAsync({
        message: message,
      });

      console.log(signature);
      console.group(address);
      setCookieClient("userSignature", signature);
      setCookieClient("nonce", nonce);
      const response = await AuthenticateUser(address, signature);

      if (response.token) {
        setCookieClient("token", response.token);
      }
      console.log(response.token);
    } catch (err) {
      await disconnect();
      console.log(err);
    } finally {
      setIsOpen(false);
    }
  };

  const createNewAccount = async (address: string) => {
    try {
      const response = await createUser(address);
      console.log("this is the response", response);
      const nonce = response.user?.nonce;
      console.log(response.status);
      console.log(nonce);
      if (nonce) {
        // User account created successfully; proceed with authentication
        await handleAuthenticate(nonce, address);
      }
    } catch (err) {
      if ((err as any).response.status === "failed") {
        console.log(err);
      }
    }
  };

  const handleSignupOrLogin = async (address: string) => {
    try {
      console.log("connected address", address);
      const res = await getNonce(address);
      console.log(res, "This is the current nonce");
      if (res.nonce) {
        console.log("nonce present");
        handleAuthenticate(res.nonce, address);
      } else {
        createNewAccount(address);
      }
    } catch (err) {}
  };

  useEffect(() => {
    const token = getCookieClient("token");
    const nonce = getCookieClient("nonce");
    const userSignature = getCookieClient("userSignature");
    console.log(token, nonce, userSignature);
    if (!token ?? !nonce ?? !userSignature) {
      console.log("session expired");
      disconnect();
    }
  }, []);

  return (
    <Modal
      goBack={isGettingStarted}
      setGoBack={
        isPlayStore
          ? setIsPlayStore
          : isAppStore
          ? setIsAppStore
          : setIsGettingStarted
      }
      back
      setIsOpen={setIsOpen}
    >
      {!isGettingStarted && (
        <Content>
          <span>Choose your preferred wallet</span>
          <Wallets>
            <Wallet
              onClick={() => connect({ connector: (connectors as any)[0] })}
            >
              <div>
                <Image src={metamaskLogo} height="38" width="38" alt="" />
                <span>Metamask</span>
              </div>
              {isWalletAvailable("metamask") && <p>installed</p>}
              <TfiAngleRight size={16} />
            </Wallet>
            <Wallet
              onClick={() => connect({ connector: (connectors as any)[1] })}
            >
              <div>
                <Image src={coinbaseLogo} height="42" width="42" alt="" />
                <span>Coinbase Wallet</span>
              </div>
              {isWalletAvailable("coinbase") && <p>installed</p>}
              <TfiAngleRight size={16} />
            </Wallet>
            <Wallet
              onClick={() => connect({ connector: (connectors as any)[2] })}
            >
              <div>
                <Image src={walletConnectLogo} height="38" width="38" alt="" />
                <span>WalletConnect</span>
              </div>
              <TfiAngleRight size={16} />
            </Wallet>
          </Wallets>
          <Help onClick={() => setIsGettingStarted(true)}>
            Need help getting started?
          </Help>
        </Content>
      )}
      {isGettingStarted && !isPlayStore && !isAppStore && (
        <Content>
          <span>Get started with EVM wallets</span>
          <p>
            An EVM Wallet is your gateway to interact with web3 apps on Ethereum
            and other custom blockchains.
          </p>
          <Recommended>
            <p>We Recommend</p>
            <div>
              <Image
                src={metamaskLogo}
                height={48}
                width={48}
                alt="Metamask Logo"
              />
              <p>Metamask</p>
            </div>
          </Recommended>
          <Channels>
            <Wallet>
              <a
                href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
                target="_blank"
                rel="noreferer"
              >
                <Image src={chrome} height="46" width="46" alt="" />
                <span>Download Chrome Extension</span>
              </a>
            </Wallet>
            <Wallet onClick={() => setIsPlayStore(true)}>
              <div>
                <Image src={playStore} height="46" width="46" alt="" />
                <span>Download on Google Play</span>
              </div>
            </Wallet>
            <Wallet onClick={() => setIsAppStore(true)}>
              <div>
                <Image src={appStore} height="46" width="46" alt="" />
                <span>Download on App Store</span>
              </div>
            </Wallet>
          </Channels>
          <Help>
            <a
              href="https://ethereum.org/en/wallets/find-wallet/"
              target="_blank"
              rel="noreferer"
            >
              Learn More About Wallets
            </a>
          </Help>
        </Content>
      )}
      {isGettingStarted && isPlayStore && (
        <QRForMobile
          type="Google Play"
          value="https://play.google.com/store/apps/details?id=io.metamask&hl=en&pli=1"
          logo={playStore}
          setTypeOff={setIsPlayStore}
          setGettingStartedOff={setIsGettingStarted}
        />
      )}
      {isGettingStarted && isAppStore && (
        <QRForMobile
          type="App Store"
          value="https://apps.apple.com/us/app/metamask-blockchain-wallet/id1438144202"
          logo={appStore}
          setTypeOff={setIsAppStore}
          setGettingStartedOff={setIsGettingStarted}
        />
      )}
    </Modal>
  );
};

export default Connector;

const Content = styled.div`
  display: flex;
  gap: 1.8rem;
  flex-direction: column;
  max-width: 55rem;
  margin: 0 auto;

  span {
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: 0px;
  }

  &:last-child {
    display: flex;
    flex-direction: column;
    gap: 2.8rem;
    max-width: 55rem;

    > p {
      color: var(--small-light-rgb);
      font-size: 1.6rem;
    }
  }
`;

const Wallets = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
`;

const Wallet = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 1.8rem;
  border-radius: 8px;
  height: 6.4rem;
  background-color: rgba(var(--foreground-rgb), 0.16);
  cursor: pointer;
  background: var(--primary-rgb);

  > div,
  a {
    width: 100%;
    display: flex;
    gap: 1.8rem;
    align-items: center;

    > span {
      font-size: 1.6rem;
      font-weight: 400;
    }
  }

  p {
    font-size: 1.2rem;
    padding: 0.3rem 0.8rem;
    /* background-color: var(--grey-background-rgb); */
    background-color: var(--tertiary-rgb);
    border-radius: 1.8rem;
    margin-right: 1rem;
    user-select: none;
    color: var(--logo-text);
  }
`;

const Help = styled.div`
  width: 100%;
  text-align: center;
  font-size: 1.4rem;
  padding: 1rem 0;
  cursor: pointer;
  color: var(--tertiary-rgb);

  a {
    text-decoration: underline;
  }
`;

const Recommended = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;

  > p {
    color: var(--small-light-rgb);
    font-size: 1.6rem;
  }

  > div {
    display: flex;
    gap: 5px;
    align-items: center;
  }
`;

const Channels = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
