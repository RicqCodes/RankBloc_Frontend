import { IParagraph, paragraphType } from "@/interfaces/write";
import { getCaret } from "@/utils/claret";
import React, { FormEvent } from "react";
import { styled } from "styled-components";

interface IDividerProps {
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
const DividerComponent: React.FC<IDividerProps> = ({
  paragraph,
  paragraphRefs,
  setOpenMedia,
  setFocusedParagraphId,
  caretPositions,
  handleParagraphInput,
}) => {
  return (
    <SectionContainer
      data-id={paragraph.id}
      contentEditable
      suppressContentEditableWarning
      ref={(ref) => (paragraphRefs.current[paragraph.id] = ref)}
      onClick={() => {
        setOpenMedia(false);
        setFocusedParagraphId(paragraph.id);
      }}
      onInput={(e) => {
        const paragraphElement = e.target as HTMLParagraphElement;
        const newContent = paragraphElement.textContent || "";
        caretPositions.current[paragraph.id] = getCaret(
          document.activeElement as HTMLElement
        );
        handleParagraphInput(
          e,
          paragraph.id,
          newContent,
          caretPositions.current[paragraph.id],
          "divider"
        );
      }}
    >
      <hr></hr>
    </SectionContainer>
  );
};

export default DividerComponent;

const SectionContainer = styled.section`
  outline: none;

  hr {
    border: none;
    display: flex;
    margin-bottom: 3.6rem;

    &::before {
      content: "...";
      width: 100%;
      font-size: 4.2rem;
      letter-spacing: 1.4rem;
      outline: none;
      text-align: center;
      color: var(--tertiary-rgb);
    }
  }
`;
