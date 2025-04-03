import { stripInlineStyles } from "./index";

describe("stripInlineStyles", () => {
  it("should remove all inline styles from a simple element", () => {
    const input = '<p style="color: red; font-size: 16px;">Hello</p>';
    const expected = "<p>Hello</p>";
    expect(stripInlineStyles(input)).toBe(expected);
  });

  it("should handle nested elements with inline styles", () => {
    const input = `
      <div style="background: blue;">
        <p style="color: red;">Hello</p>
        <span style="font-weight: bold;">World</span>
      </div>
    `;
    const expected = "<div><p>Hello</p><span>World</span></div>";
    expect(stripInlineStyles(input)).toBe(expected);
  });

  it("should remove specific styles when specified", () => {
    const input = '<p style="color: red; font-size: 16px;">Hello</p>';
    const expected = '<p style="font-size: 16px;">Hello</p>';
    expect(stripInlineStyles(input, { removeSpecificStyles: ["color"] })).toBe(
      expected
    );
  });

  it("should handle multiple specific styles to remove", () => {
    const input =
      '<p style="color: red; font-size: 16px; margin: 10px;">Hello</p>';
    const expected = '<p style="margin: 10px;">Hello</p>';
    expect(
      stripInlineStyles(input, { removeSpecificStyles: ["color", "font-size"] })
    ).toBe(expected);
  });

  it("should handle empty style attributes", () => {
    const input = '<p style="">Hello</p>';
    const expected = "<p>Hello</p>";
    expect(stripInlineStyles(input)).toBe(expected);
  });

  it("should handle elements with no style attributes", () => {
    const input = "<p>Hello</p>";
    const expected = "<p>Hello</p>";
    expect(stripInlineStyles(input)).toBe(expected);
  });

  it("should handle complex nested HTML with mixed styles", () => {
    const input = `
      <div style="padding: 20px;">
        <header style="background: #f0f0f0;">
          <h1 style="color: blue;">Title</h1>
        </header>
        <main>
          <section style="margin: 10px;">
            <p style="font-size: 14px;">Content</p>
          </section>
        </main>
      </div>
    `;
    const expected =
      "<div><header><h1>Title</h1></header><main><section><p>Content</p></section></main></div>";
    expect(stripInlineStyles(input)).toBe(expected);
  });

  it("should handle invalid HTML gracefully", () => {
    const input = '<p style="color: red">Unclosed tag';
    const expected = "<p>Unclosed tag</p>";
    expect(stripInlineStyles(input)).toBe(expected);
  });

  it("should return the input if it's not a string", () => {
    expect(stripInlineStyles(null as any)).toBeNull();
    expect(stripInlineStyles(undefined as any)).toBeUndefined();
    expect(stripInlineStyles(123 as any)).toBe(123);
  });
});
