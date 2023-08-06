import { IParagraph, paragraphType } from "@/interfaces/write";
import { getCaret } from "@/utils/claret";
import Image from "next/image";
import React, { FormEvent } from "react";
import { styled } from "styled-components";

interface IImageProps {
  paragraph: IParagraph;
  paragraphRefs: React.MutableRefObject<
    Record<string, HTMLPreElement | HTMLElement | HTMLParagraphElement | null>
  >;
  setOpenMedia: (value: boolean) => void;
  setFocusedParagraphId: (value: string) => void;
  caretPositions: React.MutableRefObject<Record<string, number>>;
  handleParagraphInput: (
    e: FormEvent<HTMLParagraphElement | HTMLPreElement | HTMLElement>,
    id: string,
    content: string,
    caretPositions: number,
    type: paragraphType
  ) => void;
}
const ImageComponent: React.FC<IImageProps> = ({
  paragraph,
  paragraphRefs,
  setOpenMedia,
  setFocusedParagraphId,
  caretPositions,
  handleParagraphInput,
}) => {
  return (
    <React.Fragment>
      <FigureContainer
        key={paragraph.id}
        data-id={paragraph.id}
        dir="ltr"
        ref={(ref) => (paragraphRefs.current[paragraph.id] = ref)}
        suppressContentEditableWarning
      >
        <Image
          src={paragraph.imageUrl || ""}
          alt={paragraph.type}
          width={"740"}
          height={"480"}
          data-id={paragraph.id}
          ref={(ref) => (paragraphRefs.current[paragraph.id] = ref)}
          contentEditable
          suppressContentEditableWarning
          onClick={() => {
            setOpenMedia(false);
            setFocusedParagraphId(paragraph.id);
          }}
        />
        <figcaption>
          <input
            type="text"
            onClick={() => {
              setOpenMedia(false);
              setFocusedParagraphId(paragraph.id);
            }}
            onChange={(e) => {
              const paragraphElement = e.target;
              const newContent = paragraphElement.value || "";
              caretPositions.current[paragraph.id] = getCaret(
                document.activeElement as HTMLElement
              );
              handleParagraphInput(
                e,
                paragraph.id,
                newContent,
                caretPositions.current[paragraph.id],
                "image"
              );
            }}
            placeholder="Type caption for image (optional)"
          />
        </figcaption>
      </FigureContainer>
    </React.Fragment>
  );
};

export default ImageComponent;

const FigureContainer = styled.figure`
  width: 100%;
  height: auto;
  max-width: 70rem;
  margin: auto;

  img {
    width: 100%;
    height: 100%;

    &:focus {
      outline-style: solid;
      outline-width: 1px;
      outline-color: var(--tertiary-rgb);
    }
  }
  figcaption {
    width: 100%;
    text-align: center;
    font-size: 1.4rem;
    font-weight: 300;
    outline: none;

    > input {
      width: 100%;
      border: none;
      padding: 1rem 0;
      outline: none;
      font-size: 1.4rem;
      font-weight: 400;
      text-align: center;
      opacity: 0.5;

      &::placeholder {
        color: var(--small-light-rgb);
        text-align: center;
        opacity: 1;
      }
    }
  }
`;
