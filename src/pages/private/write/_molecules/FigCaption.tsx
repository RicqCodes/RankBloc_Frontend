import React, { ChangeEvent } from "react";

interface FigCaptionProps {
  caption: string;
  handleCaptionChange: (newCaption: string) => void;
}

const FigCaption: React.FC<FigCaptionProps> = ({
  caption,
  handleCaptionChange,
}) => {
  const handleInput = (e: ChangeEvent<HTMLElement>) => {
    const newCaption = e.target.textContent || "";
    handleCaptionChange(newCaption);
  };

  return (
    <figcaption contentEditable onInput={handleInput}>
      {caption}
    </figcaption>
  );
};
export default FigCaption;
