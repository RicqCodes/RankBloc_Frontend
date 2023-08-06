import { IParagraph, paragraphType } from "@/interfaces/write";
import { getCaret } from "@/utils/claret";
import { extractBaseDomain } from "@/utils/helpers";
import Image from "next/image";
import React, { FormEvent } from "react";
import { styled } from "styled-components";

interface IVideoProps {
  paragraph: IParagraph;
  paragraphRefs: React.MutableRefObject<
    Record<string, HTMLPreElement | HTMLElement | HTMLParagraphElement | null>
  >;
  setOpenMedia: (value: boolean) => void;
  setFocusedParagraphId: (value: string) => void;
  setParagraphs: React.Dispatch<React.SetStateAction<IParagraph[]>>;
  caretPositions: React.MutableRefObject<Record<string, number>>;
  focusedParagraphId: string;
  handleParagraphInput: (
    e: FormEvent<HTMLParagraphElement | HTMLPreElement | HTMLElement>,
    id: string,
    content: string,
    caretPositions: number,
    type: paragraphType
  ) => void;
}
const LinkedEmbed: React.FC<IVideoProps> = ({
  paragraph,
  paragraphRefs,
  setOpenMedia,
  setFocusedParagraphId,
  focusedParagraphId,
  caretPositions,
  setParagraphs,
  handleParagraphInput,
}) => {
  const handleFetchMetadata = async (
    e: React.KeyboardEvent<HTMLInputElement>,
    paragraph: IParagraph
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

  return (
    <React.Fragment>
      {!paragraph?.webMetadata && (
        <Input
          data-id={paragraph.id}
          type="text"
          placeholder="Paste a link to embed content and press Enter"
          onChange={(e) => {
            const newContent = e.target.value;
            setParagraphs((prevParagraphs) =>
              prevParagraphs.map((p) =>
                p.id === paragraph.id ? { ...p, content: newContent } : p
              )
            );
          }}
          suppressContentEditableWarning
          ref={(ref) => (paragraphRefs.current[paragraph.id] = ref)}
          onClick={() => {
            setOpenMedia(false);
            setFocusedParagraphId(paragraph.id);
          }}
          onKeyDown={(e) => handleFetchMetadata(e, paragraph)}
        />
      )}
      {paragraph?.webMetadata && (
        <ContentEmbed
          key={paragraph.id}
          data-id={paragraph.id}
          contentEditable
          dir="ltr"
          spellCheck={false}
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
      )}
    </React.Fragment>
  );
};

export default LinkedEmbed;

const Input = styled.input`
  width: 100%;
  border: none;
  padding: 1rem 0;
  outline: none;
  font-size: 2rem;
  font-weight: 400;

  &::placeholder {
    color: var(--small-light-rgb);
    opacity: 0.5;
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
