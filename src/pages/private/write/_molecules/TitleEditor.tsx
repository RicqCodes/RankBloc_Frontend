import React, { Dispatch, SetStateAction, useState } from "react";

interface ITitleProps {
  titleRef: React.RefObject<HTMLDivElement>;
  setFocusedParagraphId: Dispatch<SetStateAction<string>>;
  handleIconMovement: () => void;
  handleTitleChange: () => void;
  isTitleEmpty: boolean;
  setIsTitleEmpty: (value: boolean) => void;
}
export const TitleEditor: React.FC<ITitleProps> = ({
  titleRef,
  setFocusedParagraphId,
  handleIconMovement,
  handleTitleChange,
  isTitleEmpty,
  setIsTitleEmpty,
}) => {
  // Bring the cursor to the title on focus
  const handleTitleFocus = () => {
    setIsTitleEmpty(false);
    if (titleRef.current) {
      titleRef.current.focus();
    }
  };

  return (
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
  );
};
