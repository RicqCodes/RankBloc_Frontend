import { IParagraph, paragraphType } from "@/interfaces/write";
import { getCaret } from "@/utils/claret";
import { extractYouTubeVideoId } from "@/utils/helpers";
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
  handleParagraphInput: (
    e: FormEvent<HTMLParagraphElement | HTMLPreElement | HTMLElement>,
    id: string,
    content: string,
    caretPositions: number,
    type: paragraphType
  ) => void;
}
const VideoEmbed: React.FC<IVideoProps> = ({
  paragraph,
  paragraphRefs,
  setOpenMedia,
  setFocusedParagraphId,
  caretPositions,
  setParagraphs,
  handleParagraphInput,
}) => {
  const handleFetchVideoData = (
    e: React.KeyboardEvent<HTMLInputElement>,
    paragraph: IParagraph
  ) => {
    if (e.key === "Enter") {
      const videoUrl = paragraph.content;
      const videoId = extractYouTubeVideoId(videoUrl);
      if (videoId) {
        setParagraphs((prevParagraphs) =>
          prevParagraphs.map((p) =>
            p.id === paragraph.id
              ? { ...p, type: "video", content: "", videoId: videoId }
              : p
          )
        );
      }
    }
  };
  return (
    <React.Fragment>
      {!paragraph?.videoId && (
        <Input
          data-id={paragraph.id}
          type="text"
          placeholder="Paste a YouTube video link and press Enter"
          onChange={(e) => {
            const newContent = e.target.value;
            setParagraphs((prevParagraphs) =>
              prevParagraphs.map((p) =>
                p.id === paragraph.id ? { ...p, content: newContent } : p
              )
            );
          }}
          ref={(ref) => (paragraphRefs.current[paragraph.id] = ref)}
          onKeyDown={(e) => handleFetchVideoData(e, paragraph)}
          suppressContentEditableWarning
        />
      )}
      {paragraph?.videoId && (
        <Video
          key={paragraph.id}
          data-id={paragraph.id}
          dir="ltr"
          ref={(ref) => (paragraphRefs.current[paragraph.id] = ref)}
          suppressContentEditableWarning
        >
          <div
            data-id={paragraph.id}
            ref={(ref) => (paragraphRefs.current[paragraph.id] = ref)}
            contentEditable
            suppressContentEditableWarning
            onClick={() => {
              setOpenMedia(false);
              setFocusedParagraphId(paragraph.id);
            }}
          >
            <iframe
              data-id={paragraph.id}
              ref={(ref) => (paragraphRefs.current[paragraph.id] = ref)}
              src={`https://www.youtube.com/embed/${paragraph.videoId}`}
              title="YouTube video player"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
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
                  "video"
                );
              }}
              placeholder="Type caption for video (optional)"
            />
          </figcaption>
        </Video>
      )}
    </React.Fragment>
  );
};

export default VideoEmbed;

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

const Video = styled.figure`
  width: 100%;
  height: 100%;
  position: relative;

  &:focus {
    outline-style: solid;
    outline-width: 1px;
    outline-color: var(--tertiary-rgb);
  }

  > div {
    width: 100%;
    height: 42rem;

    &:focus {
      outline-style: solid;
      outline-width: 1px;
      outline-color: var(--tertiary-rgb);
    }

    &::before {
      content: "";
      width: 100%;
      height: 91%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 400;
    }

    iframe {
      width: 100%;
      height: 100%;
      border: none;
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
