import { IParagraph, paragraphType } from "@/interfaces/write";
import React, { FormEvent, MutableRefObject } from "react";

import { getCaret } from "@/utils/claret";

interface IparagraphProps {
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
const TextEditor: React.FC<IparagraphProps> = ({
  paragraph,
  paragraphRefs,
  caretPositions,
  setOpenMedia,
  setFocusedParagraphId,
  handleParagraphInput,
}) => {
  return (
    <React.Fragment>
      <p
        data-id={paragraph.id}
        ref={(ref) => (paragraphRefs.current[paragraph.id] = ref)}
        contentEditable
        dir="ltr"
        suppressContentEditableWarning
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
            "text"
          );
        }}
      >
        {paragraph.content}
      </p>
    </React.Fragment>
  );
};

export default TextEditor;
