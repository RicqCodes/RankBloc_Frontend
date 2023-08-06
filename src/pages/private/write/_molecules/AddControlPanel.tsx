import React, { Dispatch, SetStateAction } from "react";
import { styled } from "styled-components";
import { v4 as uuidv4 } from "uuid";

import { LiaImage, LiaPhotoVideoSolid, LiaCodeSolid } from "react-icons/lia";
import { PiArrowsInLineVerticalFill } from "react-icons/pi";
import { AiOutlineLink } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";
import ImageUploader from "./ImageUploader";

import { IParagraph, paragraphType } from "@/interfaces/write";

interface IAddControlProps {
  openMedia: boolean;
  setOpenMedia: (value: boolean) => void;
  mediaRef: React.RefObject<HTMLDivElement>;
  isFocusedElementEmpty: boolean;
  imageInputRef: React.RefObject<HTMLInputElement>;
  focusedParagraphId: string;
  setParagraphs: Dispatch<SetStateAction<IParagraph[]>>;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddControlPanel: React.FC<IAddControlProps> = ({
  openMedia,
  setOpenMedia,
  mediaRef, // Receive mediaRef as a prop
  isFocusedElementEmpty,
  imageInputRef,
  focusedParagraphId,
  setParagraphs,
  handleImageUpload,
}) => {
  const handleIconSelect = (type: paragraphType) => {
    setOpenMedia(false);
    setParagraphs((prevParagraphs: IParagraph[]) => {
      const updatedParagraphs = prevParagraphs.map((paragraph) =>
        paragraph.id === focusedParagraphId
          ? { ...paragraph, type: type as paragraphType } // Cast type to paragraphType
          : paragraph
      );

      if (type === "link" || type === "video") {
        return [...updatedParagraphs];
      }

      const newParagraphId = uuidv4();
      const newParagraph: IParagraph = {
        id: newParagraphId,
        type: "text",
        content: "",
      };

      return [...updatedParagraphs, newParagraph];
    });
  };

  return (
    <AddContentContainer ref={mediaRef}>
      {isFocusedElementEmpty && (
        <AddContentButton
          onClick={() => setOpenMedia(!openMedia)}
          $open={openMedia}
        >
          <IoIosAddCircleOutline />
        </AddContentButton>
      )}
      {openMedia && (
        <AddContent>
          <div>
            <LiaImage onClick={() => imageInputRef.current?.click()} />
          </div>
          <div>
            <AiOutlineLink onClick={() => handleIconSelect("link")} />
          </div>
          <div>
            <LiaPhotoVideoSolid onClick={() => handleIconSelect("video")} />
          </div>
          <div onClick={() => handleIconSelect("code")}>
            <LiaCodeSolid />
          </div>
          <div onClick={() => handleIconSelect("divider")}>
            <PiArrowsInLineVerticalFill />
          </div>
          <ImageUploader
            imageInputRef={imageInputRef}
            handleImageUpload={handleImageUpload}
          />
        </AddContent>
      )}
    </AddContentContainer>
  );
};

export default AddControlPanel;

const AddContentContainer = styled.div`
  display: flex;
  position: absolute;
  left: -5.4rem;
  top: 2.1rem;
  gap: 2rem;
`;

const AddContentButton = styled.div<{ $open: boolean }>`
  svg {
    font-size: 4.2rem;
    color: var(--tertiary-rgb);
    transform: ${({ $open }) => ($open ? "rotate(135deg)" : "rotate(90deg)")};
    transition: transform 0.3s ease-in;
    cursor: pointer;
  }
`;

const AddContent = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  background-color: transparent;

  & div {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    border: 1px solid var(--tertiary-rgb);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 99;

    > svg {
      font-size: 1.8rem;
      color: var(--tertiary-rgb);
    }
  }
`;
