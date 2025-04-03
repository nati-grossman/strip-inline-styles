/**
 * Removes inline styles from HTML elements
 * @param html - The HTML string to process
 * @param options - Optional configuration
 * @returns The processed HTML with inline styles removed
 */
export function stripInlineStyles(
  html: string,
  options: {
    removeSpecificStyles?: string[];
    preserveClasses?: boolean;
  } = {}
): string {
  if (!html || typeof html !== "string") {
    return html;
  }

  // Regular expression to match style attributes with their values
  const styleRegex = /\sstyle=(["'])([^"']*)\1/g;

  // Remove or update style attributes
  let result = html.replace(
    styleRegex,
    (_match: string, quote: string, styles: string) => {
      if (!styles.trim()) {
        return "";
      }

      if (options.removeSpecificStyles?.length) {
        // Parse styles into a map
        const styleMap = new Map(
          styles
            .split(";")
            .filter((s) => s.trim())
            .map((s) => {
              const [key, ...values] = s.split(":");
              return [key.trim(), values.join(":").trim()];
            })
        );

        // Remove specified styles
        options.removeSpecificStyles.forEach((style) => {
          styleMap.delete(style);
        });

        // If there are remaining styles, rebuild the style attribute
        if (styleMap.size > 0) {
          const remainingStyles = Array.from(styleMap.entries())
            .map(([key, value]) => `${key}: ${value}`)
            .join("; ");
          return ` style=${quote}${remainingStyles};${quote}`;
        }
        return "";
      }

      // Remove all styles if no specific styles are specified
      return "";
    }
  );

  // Normalize whitespace
  result = result
    .replace(/\s+/g, " ")
    .replace(/>\s+</g, "><")
    .replace(/\s+>/g, ">")
    .replace(/<\s+/g, "<")
    .trim();

  // Handle nested HTML structure
  const tagStack: string[] = [];
  const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)[^>]*>/g;
  let lastIndex = 0;
  let finalResult = "";

  result.replace(tagRegex, (match: string, tag: string, offset: number) => {
    const isClosing = match.startsWith("</");

    // Add text between tags
    if (offset > lastIndex) {
      finalResult += result.slice(lastIndex, offset);
    }

    if (isClosing) {
      // Handle closing tag
      if (tagStack.length > 0 && tagStack[tagStack.length - 1] === tag) {
        tagStack.pop();
        finalResult += match;
      }
    } else {
      // Handle opening tag
      tagStack.push(tag);
      finalResult += match;
    }

    lastIndex = offset + match.length;
    return match;
  });

  // Add any remaining text
  if (lastIndex < result.length) {
    finalResult += result.slice(lastIndex);
  }

  // Close any remaining open tags
  while (tagStack.length > 0) {
    const tag = tagStack.pop();
    finalResult += `</${tag}>`;
  }

  return finalResult;
}

// Export default for CommonJS compatibility
export default stripInlineStyles;
