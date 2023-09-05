export const getCaret = (el: HTMLElement): number => {
  let caretAt = 0;
  const sel = window.getSelection();

  if (sel && sel.rangeCount === 0) {
    return caretAt;
  }

  const range = sel!.getRangeAt(0);
  const preRange = range.cloneRange();
  preRange.selectNodeContents(el);
  preRange.setEnd(range.endContainer, range.endOffset);
  caretAt = preRange.toString().length;

  return caretAt;
};

export const setCaret = (
  el: HTMLElement | HTMLFormElement | Element | null,
  offset: number
) => {
  const range = document.createRange();
  const sel = window.getSelection();

  if (sel && el) {
    const firstChild = el.firstChild;

    if (firstChild) {
      const textNode = firstChild instanceof Text ? firstChild : el;

      // Ensure the offset is within the valid range of the text node's length
      const adjustedOffset = Math.min(
        offset,
        textNode.textContent?.length || 0
      );

      range.setStart(textNode, adjustedOffset);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }
};
