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

export const setCaret = (el: HTMLElement | null, offset: number) => {
  const range = document.createRange();
  const sel = window.getSelection();

  if (sel && el) {
    const firstChild = el.childNodes[0];
    const textNode =
      firstChild instanceof Text ? firstChild : firstChild?.firstChild;

    if (textNode) {
      range.setStart(textNode, offset);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }
};
