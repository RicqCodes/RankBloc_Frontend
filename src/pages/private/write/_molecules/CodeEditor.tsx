import { IParagraph, paragraphType } from "@/interfaces/write";
import { getCaret } from "@/utils/claret";
import React, { FormEvent } from "react";
import { styled } from "styled-components";

interface ICodeProps {
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
const CodeEditor: React.FC<ICodeProps> = ({
  paragraph,
  paragraphRefs,
  caretPositions,
  setOpenMedia,
  setFocusedParagraphId,
  handleParagraphInput,
}) => {
  return (
    <CodeContainer
      data-id={paragraph.id}
      spellCheck={false}
      contentEditable
      dir="ltr"
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
          "code"
        );
      }}
    >
      <span>{paragraph.content}</span>
    </CodeContainer>
  );
};

export default CodeEditor;

const CodeContainer = styled.pre`
  border-color: #6b6b6b;
  transition: border-color 250ms ease-out;
  border-radius: 4px;
  padding: 0;
  box-shadow: 0px 2px 2px var(--tertiary-rgb);

  &:focus,
  &:active {
    border: 0.5px solid var(--tertiary-rgb);
  }
  background: var(--primary-rgb);
  white-space: pre;
  font-size: 14px;
  position: relative;
  outline: none;

  > span {
    display: block;
    overflow: auto;
    padding: 3.2rem;
  }
`;
