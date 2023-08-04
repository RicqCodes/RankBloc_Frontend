export const extractBaseDomain = (url: string) => {
  const matches = url.match(/^(?:https?:\/\/)?(?:www\.)?([^/]+)(?:\/.*)?$/i);
  if (matches) {
    return matches[1];
  }
  return null;
};
