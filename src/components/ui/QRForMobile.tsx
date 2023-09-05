import Image from "next/image";
import React from "react";
import { QRCode } from "react-qrcode-logo";
import { styled } from "styled-components";

const QRForMobile = ({
  type,
  logo,
  value,
  setTypeOff,
  setGettingStartedOff,
}: {
  type: string;
  value: string;
  logo: string;
  setTypeOff: (value: boolean) => void;
  setGettingStartedOff: (value: boolean) => void;
}) => {
  return (
    <Content>
      <QrContainer>
        <QRCode
          bgColor={"rgb(0, 170, 161)"}
          fgColor="#fff"
          size={220}
          value={value}
          logoImage={logo}
          eyeRadius={[
            [10, 10, 0, 10], // top/left eye
            [10, 10, 10, 0], // top/right eye
            [10, 0, 10, 10], // bottom/left
          ]}
          quietZone={8}
          id="Metamask Playstore"
        />
        <div>
          <Image src={logo} width="42" height="42" alt="playstore logo" />
          <h3>Install Metamask on {type}</h3>
        </div>
        <p>Scan QR with your phone to download MetaMask for {type}</p>
      </QrContainer>
      <Help
        onClick={() => {
          setTypeOff(false);
          setGettingStartedOff(false);
        }}
      >
        I've finished setting up my metamask on mobile
      </Help>
    </Content>
  );
};

export default QRForMobile;

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

const QrContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1.8rem;
  margin: 0 auto;

  > div {
    display: flex;
    align-items: center;
    gap: 4px;

    h3 {
      font-size: 1.8rem;
      font-weight: 600;
    }
  }

  p {
    max-width: 32rem;
    font-size: 1.6rem;
    text-align: center;
    color: var(--small-light-rgb);
  }

  > canvas {
    border-radius: 8px;
  }
`;

const Help = styled.div`
  width: 100%;
  text-align: center;
  font-size: 1.4rem;
  padding: 1rem 0;
  cursor: pointer;
  color: var(--tertiary-rgb);
`;
