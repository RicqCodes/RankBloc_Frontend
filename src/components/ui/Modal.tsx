import React from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import { MdArrowBackIos } from "react-icons/md";

// import { fadein, popup } from "@/styles/animation.styled";

interface IModal {
  setIsOpen: (value: boolean) => void;
  setGoBack?: (value: boolean) => void;
  goBack?: boolean;
  back?: boolean;
  children: React.ReactNode;
}
const Modal: React.FC<IModal> = ({
  setIsOpen,
  setGoBack,
  goBack,
  back,
  children,
}) => {
  return (
    <>
      <ModalOverlay
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(false);
        }}
      >
        <ModalContainer
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <ModalHeader>
            {back && goBack ? (
              <div onClick={() => setGoBack && setGoBack(false)}>
                <MdArrowBackIos size="24" />
              </div>
            ) : (
              <div></div>
            )}
            <div onClick={() => setIsOpen(false)}>
              <MdClose size="24" />
            </div>
          </ModalHeader>
          <ModalBody>{children}</ModalBody>
        </ModalContainer>
      </ModalOverlay>
    </>
  );
};

export default Modal;

const ModalOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
`;
/* animation: ${fadein} 0.3s linear; */

const ModalContainer = styled.div`
  width: 90%;
  max-width: 650px;
  min-height: 200px;
  max-height: 600px;
  overflow: auto;
  border-radius: 8px;
  background: var(--secondary-rgb);
  padding: 24px;
`;
/* animation: ${popup} 0.2s linear; */

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  > div {
    /* margin-left: auto; */
    cursor: pointer;
  }
`;

const ModalBody = styled.div`
  margin-top: 18px;
  color: rgb(var(--foreground-rgb));
`;
