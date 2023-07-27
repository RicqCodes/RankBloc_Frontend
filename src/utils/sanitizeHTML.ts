import DOMPurify from "dompurify";

export const sanitizeHTML = (text: string): string => {
  return DOMPurify.sanitize(text);
};
