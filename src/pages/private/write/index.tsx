"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { styled } from "styled-components";

import { v4 as uuidv4 } from "uuid";

import { setCaret } from "@/utils/claret";
import { toBase64 } from "@/utils/toBase64";

import { IParagraph, paragraphType } from "@/interfaces/write";
import AddControlPanel from "./_molecules/AddControlPanel";
import { TitleEditor } from "./_molecules/TitleEditor";
import { ParagraphEditor } from "./_molecules/ParagraphEditor";

const WritePage = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const caretPositions = useRef<Record<string, number>>({});
  const paragraphRefs = useRef<
    Record<string, HTMLParagraphElement | HTMLPreElement | HTMLElement | null>
  >({});

  const [openMedia, setOpenMedia] = useState<boolean>(false);
  const [isTitleEmpty, setIsTitleEmpty] = useState<boolean>(true);
  const [paragraphs, setParagraphs] = useState<IParagraph[]>([
    { id: "1", type: "text", content: "" },
  ]);
  const [title, setTitle] = useState("");
  const [focusedParagraphId, setFocusedParagraphId] = useState("");
  const [isFocusedElementEmpty, setIsFocusedElementEmpty] =
    useState<boolean>(true);

  // Handle changes to the title
  const handleTitleChange = () => {
    if (titleRef.current) {
      const updatedTitle = titleRef.current.textContent ?? "";
      setIsTitleEmpty(updatedTitle?.trim() === "");
      setTitle(updatedTitle);
    }
  };

  // Handle icon movement based on the focused element
  const handleIconMovement = () => {
    const focusedElement = document.activeElement;
    if (
      focusedElement instanceof HTMLElement &&
      focusedElement !== mediaRef.current
    ) {
      const topPosition = focusedElement.offsetTop;

      if (focusedElement?.tagName !== "H2") {
        mediaRef.current?.style?.setProperty("top", `${topPosition / 10}rem`);
      } else {
        mediaRef.current?.style?.setProperty("top", `2.1rem`);
      }
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Convert the file to base64
    const base64 = await toBase64(file as File);

    if (typeof base64 === "string") {
      setParagraphs((prevParagraphs: IParagraph[]) => {
        const updatedParagraphs = prevParagraphs.map((paragraph) =>
          paragraph.id === focusedParagraphId
            ? { ...paragraph, type: "image" as paragraphType, imageUrl: base64 } // Cast type to paragraphType
            : paragraph
        );

        const newParagraphId = uuidv4();
        const newParagraph: IParagraph = {
          id: newParagraphId,
          type: "text",
          content: "",
        };

        return [...updatedParagraphs, newParagraph];
      });
      setOpenMedia(false);
    } else {
      // Handle the case where base64 is not a string (e.g., due to a failed conversion)
      console.error("Failed to convert image to base64.");
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const focusedElement = document.activeElement as HTMLElement | null;
      const { key } = event;

      if (key === "Enter") {
        event.preventDefault();

        if (focusedElement) {
          if (focusedElement.tagName === "PRE") {
            // Add a new line to <pre> tag content
            const paragraphId = focusedElement.getAttribute("data-id");
            setParagraphs((prevParagraphs) =>
              prevParagraphs.map((paragraph) =>
                paragraph.id === paragraphId
                  ? { ...paragraph, content: paragraph.content + "\n" }
                  : paragraph
              )
            );
            caretPositions.current[focusedParagraphId] =
              focusedElement.textContent?.length || 0;
          } else {
            // Create a new paragraph if the focused element is not <pre>
            const newParagraphId = uuidv4();
            setParagraphs((prevParagraphs) => [
              ...prevParagraphs,
              { id: newParagraphId, type: "text", content: "" },
            ]);
            setFocusedParagraphId(newParagraphId);
          }
        }
      } else if (key === "Delete" || key === "Backspace") {
        if (focusedElement?.hasAttribute("data-id")) {
          const paragraphIdToDelete = focusedElement.getAttribute("data-id");

          setParagraphs((prevParagraphs) => {
            const paragraphIndexToDelete = prevParagraphs.findIndex(
              (paragraph) => paragraph.id === paragraphIdToDelete
            );

            if (paragraphIndexToDelete >= 0) {
              const paragraphToDelete = prevParagraphs[paragraphIndexToDelete];

              // Check if the paragraph content is empty
              if (paragraphToDelete.content.trim() === "") {
                event.preventDefault();
                event.stopPropagation();

                const newParagraphs = prevParagraphs.filter(
                  (paragraph) => paragraph.id !== paragraphIdToDelete
                );

                if (newParagraphs.length === 0) {
                  // If all paragraphs are deleted, focus on the h3 element
                  setFocusedParagraphId("0");
                } else {
                  // Focus on the previous or next paragraph if there are remaining paragraphs
                  const nextParagraphIndex = Math.min(
                    paragraphIndexToDelete,
                    newParagraphs.length - 1
                  );
                  setFocusedParagraphId(newParagraphs[nextParagraphIndex].id);
                }

                return newParagraphs;
              }
            }

            return prevParagraphs;
          });
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (focusedParagraphId) {
      const newParagraphRef = paragraphRefs.current[focusedParagraphId];
      if (newParagraphRef) {
        newParagraphRef.focus();
        handleIconMovement();
      } else {
        titleRef.current?.focus();
        handleIconMovement();
      }
    }
  }, [focusedParagraphId]);

  useLayoutEffect(() => {
    const newParagraphRef = paragraphRefs.current[focusedParagraphId];
    if (newParagraphRef) {
      newParagraphRef.focus();

      const currentParagraph = paragraphs.find(
        (p) => p.id === newParagraphRef.getAttribute("data-id")
      );

      if (currentParagraph?.content !== "") {
        setCaret(newParagraphRef, caretPositions.current[focusedParagraphId]);
      }
    }
  }, [paragraphs, focusedParagraphId]);

  useEffect(() => {
    if (focusedParagraphId) {
      const focusedParagraph = paragraphs.find(
        (p) => p.id === focusedParagraphId
      );

      if (focusedParagraph?.type === "text") {
        const focusedElement = paragraphRefs.current[focusedParagraphId];
        if (focusedElement) {
          setIsFocusedElementEmpty(focusedElement.textContent?.trim() === "");
        }
      } else {
        setIsFocusedElementEmpty(false);
      }
    }
  }, [focusedParagraphId, paragraphs]);

  console.log(paragraphs);

  return (
    <WriteContainer>
      <SectionContainer>
        <InnerContainer>
          <AddControlPanel
            openMedia={openMedia}
            setOpenMedia={setOpenMedia}
            mediaRef={mediaRef}
            isFocusedElementEmpty={isFocusedElementEmpty}
            imageInputRef={imageInputRef}
            focusedParagraphId={focusedParagraphId}
            setParagraphs={setParagraphs}
            handleImageUpload={handleImageUpload}
          />
          <TitleEditor
            data-id={0}
            titleRef={titleRef}
            isTitleEmpty={isTitleEmpty}
            setIsTitleEmpty={setIsTitleEmpty}
            setFocusedParagraphId={setFocusedParagraphId}
            handleIconMovement={handleIconMovement}
            handleTitleChange={handleTitleChange}
          />
          <div ref={contentRef} onClick={handleIconMovement}>
            <ParagraphEditor
              paragraphs={paragraphs}
              paragraphRefs={paragraphRefs}
              setParagraphs={setParagraphs}
              setOpenMedia={setOpenMedia}
              focusedParagraphId={focusedParagraphId}
              setFocusedParagraphId={setFocusedParagraphId}
              caretPositions={caretPositions}
            />
          </div>
        </InnerContainer>
      </SectionContainer>
    </WriteContainer>
  );
};

export default WritePage;

const WriteContainer = styled.div`
  width: 100%;
`;

const SectionContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const InnerContainer = styled.div`
  max-width: 74rem;
  width: 100%;
  margin: 4.8rem auto;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 3.6rem;

  h2,
  p {
    width: 100%;
    outline: none;
    position: relative;
    padding: 8px 16px;

    > span {
      font-weight: 100;
      opacity: 0.4;
      color: var(--tertiary-rgb);
    }
  }

  h2 {
    width: 100%;
    font-size: 4.2rem;
    outline: none;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      display: flex;
      width: 2px;
      height: 100%;
      /* transform: rotate(90deg); Initial rotation (horizontal) */
      background: var(--tertiary-rgb);
      top: 0;
      left: 0;
    }

    > span {
      font-weight: 100;
      opacity: 0.4;
      color: var(--tertiary-rgb);
      font-size: 4.2rem;
    }
  }

  p {
    font-weight: 1.8rem;

    &.focused {
      opacity: 0;
    }
  }

  > div:last-child {
    display: flex;
    flex-direction: column;
    gap: 3.6rem;

    figure {
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
    }
  }
`;
