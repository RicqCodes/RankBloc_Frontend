import React from "react";

interface ImageUploaderProps {
  imageInputRef: React.RefObject<HTMLInputElement>;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const ImageUploader: React.FC<ImageUploaderProps> = ({
  imageInputRef,
  handleImageUpload,
}) => {
  return (
    <input
      type="file"
      ref={imageInputRef}
      accept="image/*"
      style={{ display: "none" }}
      onChange={handleImageUpload}
    />
  );
};

export default ImageUploader;
