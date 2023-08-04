"use client";

import React, {
  ChangeEventHandler,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { styled } from "styled-components";

import { v4 as uuidv4 } from "uuid";
import { LiaImage, LiaPhotoVideoSolid, LiaCodeSolid } from "react-icons/lia";
import { PiArrowsInLineVerticalFill } from "react-icons/pi";
import { AiOutlineLink } from "react-icons/ai";

import { IoIosAddCircleOutline } from "react-icons/io";
import Image from "next/image";

import { getCaret, setCaret } from "@/utils/claret";
import { toBase64 } from "@/utils/toBase64";
import { extractBaseDomain } from "@/utils/helpers";

type paragraphType = "text" | "image" | "video" | "code" | "divider" | "link";

interface Metadata {
  siteName: string;
  url: string;
  type: string;
  title: string;
  description: string;
  image: string;
}

interface Paragraph {
  id: string;
  type: paragraphType;
  content: string;
  figCaption?: string;
  webMetadata?: Metadata;
}

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
  const [paragraphs, setParagraphs] = useState<Paragraph[]>([
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

  // Bring the cursor to the title on focus
  const handleTitleFocus = () => {
    setIsTitleEmpty(false);
    if (titleRef.current) {
      titleRef.current.focus();
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

  const handleParagraphInput = (
    e: FormEvent<HTMLParagraphElement | HTMLPreElement>,
    id: string,
    content: string,
    caretOffset: number,
    type: paragraphType
  ) => {
    const updatedParagraphs = paragraphs.map((paragraph) =>
      paragraph.id === id ? { ...paragraph, content, type } : paragraph
    );

    setParagraphs(updatedParagraphs);

    // Set the caret position within the updated paragraph
    const focusedParagraphElement = document.querySelector(
      `p[data-id="${id}"]`
    );
    const paragraph = e.target as HTMLParagraphElement;
    if (
      focusedParagraphElement instanceof HTMLElement &&
      paragraph.textContent !== ""
    ) {
      setCaret(focusedParagraphElement, caretOffset);
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Convert the file to base64
    const base64 = await toBase64(file as File);

    const updatedParagraphs = paragraphs.map((paragraph) =>
      paragraph.id === focusedParagraphId
        ? { ...paragraph, content: base64, type: "image" }
        : paragraph
    );

    setParagraphs(updatedParagraphs);

    const newParagraphId = uuidv4();
    setParagraphs((prevParagraphs) => [
      ...prevParagraphs,
      { id: newParagraphId, type: "text", content: "" }, // Add a new paragraph with a unique id
    ]);
    setOpenMedia(false);
  };

  const handleFetchMetadata = async (
    e: React.KeyboardEvent<HTMLInputElement>,
    paragraph: Paragraph
  ) => {
    // Fetch video metadata (you might need a different approach to fetch video metadata)
    if (e.key === "Enter") {
      try {
        const res = await fetch(
          `http://localhost:8000/api/v1/miscellaneous/metadata?url=${paragraph.content}`
        );

        const dataResponse = await res.json();

        if (dataResponse) {
          const newMetadata = {
            siteName: dataResponse.data.og.site_name,
            url: dataResponse.data.og.url,
            type: dataResponse.data.og.type,
            title: dataResponse.data.meta.title,
            description: dataResponse.data.meta.description,
            image: dataResponse.data.og.image,
          };
          setParagraphs((prevParagraph) => {
            return prevParagraph.map((paragraph) =>
              paragraph.id === focusedParagraphId
                ? { ...paragraph, webMetadata: newMetadata }
                : paragraph
            );
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    const content = contentRef.current;
    // Handler for adding a new paragraph when Enter key is pressed
    const addNewParagraph = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter") {
        event.preventDefault();

        const focusedElement = document.activeElement as HTMLElement | null;

        if (focusedElement) {
          if (focusedElement.tagName === "PRE") {
            // If the focused element is a <pre> tag, add a new line to its content
            const paragraphId = focusedElement.getAttribute("data-id");
            setParagraphs((prevParagraphs) => {
              return prevParagraphs.map((paragraph) =>
                paragraph.id === paragraphId
                  ? { ...paragraph, content: paragraph.content + "\n" }
                  : paragraph
              );
            });
            caretPositions.current[focusedParagraphId] =
              focusedElement.textContent?.length || 0;
          } else {
            // If the focused element is not a <pre> tag, create a new paragraph
            const newParagraphId = uuidv4();
            setParagraphs((prevParagraphs) => [
              ...prevParagraphs,
              { id: newParagraphId, type: "text", content: "" },
            ]);
            setFocusedParagraphId(newParagraphId);
          }
        }
      }
    };

    // const removeParagraph = (event: React.KeyboardEvent<HTMLDivElement>) => {
    //   if (event.key === "Delete" || event.key === "Backspace") {
    //     const focusedElementToDelete =
    //       document.activeElement as HTMLElement | null;

    //     if (
    //       // focusedElement?.tagName === "P" &&
    //       focusedElementToDelete?.getAttribute("data-id")
    //     ) {
    //       const paragraphIdToDelete =
    //         focusedElementToDelete.getAttribute("data-id");

    //       setParagraphs((prevParagraphs) => {
    //         const paragraph = prevParagraphs.find(
    //           (p) => p.id === paragraphIdToDelete
    //         );
    //         if (paragraph && paragraph.content.trim() === "") {
    //           const paragraphIndex = prevParagraphs.findIndex(
    //             (p) => p.id === paragraphIdToDelete
    //           );

    //           if (paragraphIndex > 0) {
    //             setFocusedParagraphId(prevParagraphs[paragraphIndex - 1].id);
    //           }

    //           return prevParagraphs.filter((p) => p.id !== paragraphIdToDelete);
    //         }
    //         return prevParagraphs;
    //       });
    //     }
    //   }
    // };
    // const removeParagraph = (event: React.KeyboardEvent<HTMLDivElement>) => {
    //   const { key } = event;

    //   if (key === "Delete" || key === "Backspace") {
    //     const focusedElementToDelete = document.activeElement as HTMLElement;

    //     if (focusedElementToDelete?.hasAttribute("data-id")) {
    //       const paragraphIdToDelete =
    //         focusedElementToDelete.getAttribute("data-id");

    //       setParagraphs((prevParagraphs) => {
    //         const paragraphIndexToDelete = prevParagraphs.findIndex(
    //           (paragraph) => paragraph.id === paragraphIdToDelete
    //         );

    //         if (paragraphIndexToDelete >= 0) {
    //           event.preventDefault(); // Prevent browser's default behavior
    //           event.stopPropagation(); // Prevent event from bubbling up

    //           // Calculate the index of the paragraph to focus after deletion
    //           let nextParagraphIndex = paragraphIndexToDelete;
    //           if (key === "Delete") {
    //             nextParagraphIndex = Math.min(
    //               paragraphIndexToDelete,
    //               prevParagraphs.length - 2
    //             );
    //           } else if (key === "Backspace") {
    //             nextParagraphIndex = Math.max(paragraphIndexToDelete - 1, 0);
    //           }

    //           // Set the new focused paragraph id
    //           setFocusedParagraphId(prevParagraphs[nextParagraphIndex].id);

    //           // Return the updated paragraphs state by filtering out the deleted paragraph
    //           return prevParagraphs.filter(
    //             (paragraph) => paragraph.id !== paragraphIdToDelete
    //           );
    //         }

    //         return prevParagraphs;
    //       });
    //     }
    //   }
    // };

    const removeParagraph = (event: React.KeyboardEvent<HTMLDivElement>) => {
      const { key } = event;
      const focusedElementToDelete = document.activeElement as HTMLElement;

      if (key === "Delete" || key === "Backspace") {
        if (focusedElementToDelete?.hasAttribute("data-id")) {
          const paragraphIdToDelete =
            focusedElementToDelete.getAttribute("data-id");

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

                console.log(newParagraphs.length);

                if (newParagraphs.length === 0) {
                  // If all paragraphs are deleted, focus on the h3 element
                  setFocusedParagraphId("0");
                } else {
                  // If there are remaining paragraphs, focus on the previous or next paragraph
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

    document.addEventListener("keydown", addNewParagraph);
    content?.addEventListener("keydown", removeParagraph);

    return () => {
      document.removeEventListener("keydown", addNewParagraph);
      content?.addEventListener("keydown", removeParagraph);
    };
  }, []); // Add the dependency array to run the effect only once

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

  useEffect(() => {
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
      const focusedElement = paragraphRefs.current[focusedParagraphId];
      if (focusedElement) {
        setIsFocusedElementEmpty(focusedElement.textContent?.trim() === "");
      }
    }
  }, [focusedParagraphId, paragraphs]);

  return (
    <WriteContainer>
      <SectionContainer>
        <InnerContainer>
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
                  <AiOutlineLink
                    onClick={() => {
                      setOpenMedia(false);
                      setParagraphs((prevParagraphs) =>
                        prevParagraphs.map((paragraph) =>
                          paragraph.id === focusedParagraphId
                            ? { ...paragraph, type: "link" }
                            : paragraph
                        )
                      );
                    }}
                  />
                </div>
                <div>
                  <LiaPhotoVideoSolid />
                </div>
                <div>
                  <LiaCodeSolid
                    onClick={() => {
                      setOpenMedia(false);
                      setParagraphs((prevParagraphs) =>
                        prevParagraphs.map((paragraph) =>
                          paragraph.id === focusedParagraphId
                            ? { ...paragraph, type: "code" }
                            : paragraph
                        )
                      );
                      const newParagraphId = uuidv4();
                      setParagraphs((prevParagraphs) => [
                        ...prevParagraphs,
                        { id: newParagraphId, type: "text", content: "" }, // Add a new paragraph with a unique id
                      ]);
                    }}
                  />
                </div>
                <div
                  onClick={() => {
                    setOpenMedia(false);
                    setParagraphs((prevParagraphs) =>
                      prevParagraphs.map((paragraph) =>
                        paragraph.id === focusedParagraphId
                          ? { ...paragraph, type: "divider" }
                          : paragraph
                      )
                    );
                    const newParagraphId = uuidv4();
                    setParagraphs((prevParagraphs) => [
                      ...prevParagraphs,
                      { id: newParagraphId, type: "text", content: "" }, // Add a new paragraph with a unique id
                    ]);
                  }}
                >
                  <PiArrowsInLineVerticalFill />
                </div>
                <input
                  type="file"
                  ref={imageInputRef}
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />
              </AddContent>
            )}
          </AddContentContainer>
          <h2
            ref={titleRef}
            data-id="0"
            contentEditable
            onBlur={handleTitleChange}
            onFocus={handleTitleFocus}
            onClick={() => {
              setFocusedParagraphId("0");
              handleIconMovement();
            }}
            suppressContentEditableWarning
          >
            {isTitleEmpty ? <span>Title</span> : null}
          </h2>
          <div ref={contentRef} onClick={handleIconMovement}>
            {paragraphs.map((paragraph) => {
              if (paragraph.type === "text") {
                return (
                  <p
                    key={paragraph.id}
                    data-id={paragraph.id}
                    contentEditable
                    dir="ltr"
                    suppressContentEditableWarning
                    ref={(ref) => (paragraphRefs.current[paragraph.id] = ref)}
                    onClick={() => setFocusedParagraphId(paragraph.id)}
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
                );
              } else if (paragraph.type === "image") {
                return (
                  <figure
                    key={paragraph.id}
                    data-id={paragraph.id}
                    contentEditable
                    dir="ltr"
                    suppressContentEditableWarning
                    ref={(ref) => (paragraphRefs.current[paragraph.id] = ref)}
                    onClick={() => setFocusedParagraphId(paragraph.id)}
                  >
                    <div>
                      <Image
                        key={paragraph.id}
                        src={paragraph.content}
                        alt={paragraph.type}
                        width={"740"}
                        height={"480"}
                      />
                    </div>

                    <figcaption>
                      {}
                      Type caption for image (optional)
                    </figcaption>
                  </figure>
                );
              } else if (paragraph.type === "video") {
                return <video key={paragraph.id} />;
              } else if (paragraph.type === "link") {
                if (!paragraph?.webMetadata) {
                  return (
                    <input
                      key={paragraph.id}
                      data-id={paragraph.id}
                      type="text"
                      placeholder="Paste a link to embed content and press Enter"
                      onChange={(e) => {
                        const newContent = e.target.value;
                        setParagraphs((prevParagraphs) =>
                          prevParagraphs.map((p) =>
                            p.id === paragraph.id
                              ? { ...p, content: newContent }
                              : p
                          )
                        );
                      }}
                      suppressContentEditableWarning
                      ref={(ref) => (paragraphRefs.current[paragraph.id] = ref)}
                      onClick={() => setFocusedParagraphId(paragraph.id)}
                      onKeyDown={(e) => handleFetchMetadata(e, paragraph)}
                    />
                  );
                }
                if (paragraph?.webMetadata) {
                  return (
                    <ContentEmbed
                      key={paragraph.id}
                      data-id={paragraph.id}
                      contentEditable
                      dir="ltr"
                      spellCheck={false}
                      suppressContentEditableWarning
                      ref={(ref) => (paragraphRefs.current[paragraph.id] = ref)}
                      onClick={() => setFocusedParagraphId(paragraph.id)}
                      onInput={(e) => {
                        const paragraphElement =
                          e.target as HTMLParagraphElement;
                        const newContent = paragraphElement.textContent || "";
                        caretPositions.current[paragraph.id] = getCaret(
                          document.activeElement as HTMLElement
                        );
                        handleParagraphInput(
                          e,
                          paragraph.id,
                          newContent,
                          caretPositions.current[paragraph.id],
                          "link"
                        );
                      }}
                    >
                      <TextContainer>
                        <h3>{paragraph.webMetadata.title}</h3>
                        <p>{paragraph.webMetadata.description}</p>
                        <p>
                          {extractBaseDomain(
                            paragraph.webMetadata.url || paragraph.content
                          )}
                        </p>
                      </TextContainer>
                      {paragraph.webMetadata.image && (
                        <ImageContainer>
                          <Image
                            src={paragraph.webMetadata?.image || ""}
                            alt={paragraph.webMetadata?.description}
                            height="100"
                            width="80"
                          />
                        </ImageContainer>
                      )}
                    </ContentEmbed>
                  );
                }
              } else if (paragraph.type === "code") {
                return (
                  <CodeContainer
                    data-id={paragraph.id}
                    key={paragraph.id}
                    spellCheck={false}
                    contentEditable
                    dir="ltr"
                    suppressContentEditableWarning
                    ref={(ref) => (paragraphRefs.current[paragraph.id] = ref)}
                    onClick={() => setFocusedParagraphId(paragraph.id)}
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
              } else if (paragraph.type === "divider") {
                return (
                  <section
                    key={paragraph.id}
                    data-id={paragraph.id}
                    contentEditable
                    suppressContentEditableWarning
                    ref={(ref) => (paragraphRefs.current[paragraph.id] = ref)}
                    onClick={() => setFocusedParagraphId(paragraph.id)}
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
                  </section>
                );
              }
            })}
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
  gap: 4.8rem;

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
    gap: 2.4rem;

    figure {
      width: 100%;
      height: auto;

      &:focus {
        outline: solid var(--tertiary-rgb);
      }

      > div {
        max-width: 70rem;
        max-height: 70rem;
        margin: auto;

        &:focus {
          outline: 1px solid rgb(--primary-rgb);
        }

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    figcaption {
      width: 100%;
      text-align: center;
      margin-top: 2.8rem;
      font-size: 1.4rem;
      font-weight: 300;
    }

    > section {
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
    }

    input {
      border: none;
      padding: 1rem 0;
      outline: none;
      font-size: 2rem;
      font-weight: 400;

      &::placeholder {
        color: var(--small-light-rgb);
        opacity: 0.5;
      }
    }
  }
`;

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

const CodeContainer = styled.pre`
  border-color: #6b6b6b;
  transition: border-color 250ms ease-out;
  border-radius: 4px;
  padding: 0;
  box-shadow: 0px 8px 8px var(--tertiary-rgb);

  &:focus,
  &:active {
    border: 1px solid var(--tertiary-rgb);
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

const ContentEmbed = styled.div`
  width: 100%;
  border: 1px solid var(--primary-rgb);
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 1rem;
  outline: none;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 1.8rem;
  justify-content: center;

  h3 {
    font-size: 1.6rem;
    font-weight: 500;
  }

  p {
    padding: 0;
    font-size: 1.4rem;
  }

  p:last-child {
    opacity: 0.6;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  width: 18rem;
  max-height: 18rem;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.09);

  img {
    width: 100%;
    height: 100%;
  }
`;
