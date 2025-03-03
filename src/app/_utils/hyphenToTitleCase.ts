export const hyphenToTitleCase = (hyphenatedString: string): string => {
  return hyphenatedString
    .split("-")
    .map((word) => word.toUpperCase())
    .join(" ");
};
