export type paragraphType =
  | "text"
  | "image"
  | "video"
  | "code"
  | "divider"
  | "link";

export interface IMetadata {
  siteName: string;
  url: string;
  type: string;
  title: string;
  description: string;
  image: string;
}

export interface IParagraph {
  id: string;
  type: paragraphType;
  imageUrl?: string;
  content: string;
  figCaption?: string;
  videoId?: string;
  webMetadata?: IMetadata;
}
