export const extractBaseDomain = (url: string) => {
  const matches = url.match(/^(?:https?:\/\/)?(?:www\.)?([^/]+)(?:\/.*)?$/i);
  if (matches) {
    return matches[1];
  }
  return null;
};

export const extractYouTubeVideoId = (url: string): string | null => {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/);
  console.log(url);
  return match ? match[1] : null;
};
