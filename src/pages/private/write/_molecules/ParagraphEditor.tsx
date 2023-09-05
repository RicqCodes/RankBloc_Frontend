import React, { Dispatch, FormEvent, SetStateAction } from "react";
import { IParagraph, paragraphType } from "@/interfaces/write";
import { getCaret, setCaret } from "@/utils/claret";
import DividerComponent from "./DividerComponent";
import VideoEmbed from "./VideoEmbed";
import TextEditor from "./TextEditor";
import CodeEditor from "./CodeEditor";
import ImageComponent from "./ImageComponent";
import LinkedEmbed from "./LinkedEmbed";

interface IParagraphEditorProps {
  paragraphs: IParagraph[];
  setParagraphs: Dispatch<SetStateAction<IParagraph[]>>;
  paragraphRefs: React.MutableRefObject<
    Record<string, HTMLParagraphElement | HTMLElement | HTMLPreElement | null>
  >;
  setOpenMedia: (value: boolean) => void;
  focusedParagraphId: string;
  setFocusedParagraphId: (value: string) => void;
  caretPositions: React.MutableRefObject<Record<string, number>>;
  handleTextSelect: () => void;
  applyFormatting: (value: string) => void;
  selectedText: string;
}
export const ParagraphEditor: React.FC<IParagraphEditorProps> = ({
  paragraphs,
  setParagraphs,
  paragraphRefs,
  setOpenMedia,
  focusedParagraphId,
  setFocusedParagraphId,
  caretPositions,
  handleTextSelect,
  applyFormatting,
  selectedText,
}) => {
  const handleParagraphInput = (
    e: FormEvent<HTMLParagraphElement | HTMLPreElement | HTMLElement>,
    id: string,
    content: string,
    caretOffset: number,
    type: paragraphType
  ) => {
    if (type === "image" || type === "video") {
      setParagraphs((prevParagraph) =>
        prevParagraph.map((paragraph) =>
          paragraph.id === id
            ? { ...paragraph, figCaption: content, type }
            : paragraph
        )
      );
      return;
    }

    setParagraphs((prevParagraph) => {
      return prevParagraph.map((paragraph) => {
        return paragraph.id === id
          ? { ...paragraph, content, type }
          : paragraph;
      });
    });

    // Set the caret position within the updated paragraph
    const focusedParagraphElement = document.querySelector(
      `p[data-id="${id}"]`
    );
    const paragraph = e.target as HTMLParagraphElement;
    if (paragraph.textContent !== "") {
      setCaret(focusedParagraphElement, caretOffset);
    }
  };

  return (
    <React.Fragment>
      {paragraphs.map((paragraph) => {
        if (paragraph.type === "text") {
          return (
            <TextEditor
              key={paragraph.id}
              paragraph={paragraph}
              paragraphRefs={paragraphRefs}
              setOpenMedia={setOpenMedia}
              setFocusedParagraphId={setFocusedParagraphId}
              caretPositions={caretPositions}
              handleParagraphInput={handleParagraphInput}
              handleTextSelect={handleTextSelect}
              applyFormatting={applyFormatting}
              selectedText={selectedText}
            />
          );
        } else if (paragraph.type === "image") {
          return (
            <ImageComponent
              key={paragraph.id}
              paragraph={paragraph}
              paragraphRefs={paragraphRefs}
              setOpenMedia={setOpenMedia}
              setFocusedParagraphId={setFocusedParagraphId}
              caretPositions={caretPositions}
              handleParagraphInput={handleParagraphInput}
            />
          );
        } else if (paragraph.type === "video") {
          return (
            <VideoEmbed
              key={paragraph.id}
              paragraph={paragraph}
              setParagraphs={setParagraphs}
              paragraphRefs={paragraphRefs}
              setOpenMedia={setOpenMedia}
              setFocusedParagraphId={setFocusedParagraphId}
              caretPositions={caretPositions}
              handleParagraphInput={handleParagraphInput}
            />
          );
        } else if (paragraph.type === "link") {
          return (
            <LinkedEmbed
              key={paragraph.id}
              paragraph={paragraph}
              paragraphRefs={paragraphRefs}
              setParagraphs={setParagraphs}
              setOpenMedia={setOpenMedia}
              setFocusedParagraphId={setFocusedParagraphId}
              focusedParagraphId={focusedParagraphId}
              caretPositions={caretPositions}
              handleParagraphInput={handleParagraphInput}
            />
          );
        } else if (paragraph.type === "code") {
          return (
            <CodeEditor
              key={paragraph.id}
              paragraph={paragraph}
              paragraphRefs={paragraphRefs}
              setOpenMedia={setOpenMedia}
              setFocusedParagraphId={setFocusedParagraphId}
              caretPositions={caretPositions}
              handleParagraphInput={handleParagraphInput}
            />
          );
        } else if (paragraph.type === "divider") {
          return (
            <DividerComponent
              key={paragraph.id}
              paragraph={paragraph}
              paragraphRefs={paragraphRefs}
              setOpenMedia={setOpenMedia}
              setFocusedParagraphId={setFocusedParagraphId}
              caretPositions={caretPositions}
              handleParagraphInput={handleParagraphInput}
            />
          );
        }
      })}
    </React.Fragment>
  );
};
