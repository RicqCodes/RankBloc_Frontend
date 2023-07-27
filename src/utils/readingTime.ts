const AVERAGE_READING_SPEED = 225; // words per minute

const countWords = (contentArr: Array<string>): number => {
  let textCount = 0;

  contentArr.forEach((content) => {
    if (content.type === "text") {
      textCount += content.text.trim().split(" ").length;
    }
  });
  return textCount;
};

const calculateReadingTime = (contentArr: Array<string>): number => {
  const wordCount = countWords(contentArr);
  const readingTimeMinutes = Math.ceil(wordCount / AVERAGE_READING_SPEED);
  return readingTimeMinutes;
};
