# strip-inline-styles

A lightweight utility to remove inline styles from HTML strings, with no dependencies. Perfect for Angular, React, Vue, and Node.js applications.

[![npm version](https://badge.fury.io/js/strip-inline-styles.svg)](https://www.npmjs.com/package/strip-inline-styles)
[![GitHub](https://img.shields.io/github/license/nati-grossman/strip-inline-styles)](https://github.com/nati-grossman/strip-inline-styles)

## Repository

[GitHub Repository](https://github.com/nati-grossman/strip-inline-styles)

## Features

- 🎯 Removes all inline styles from HTML strings
- 🔧 Option to remove specific styles while preserving others
- 🌳 Handles nested and complex HTML structures
- 🛡️ TypeScript support with full type definitions
- ⚡ Zero dependencies
- 🧪 Comprehensive test coverage
- 🌐 Works in any JavaScript environment

## Installation

```bash
npm install strip-inline-styles
```

## Usage

### Basic Usage

```typescript
import { stripInlineStyles } from "strip-inline-styles";

const html = '<p style="color: red; font-size: 16px;">Hello</p>';
const result = stripInlineStyles(html);
console.log(result);
// Output: <p>Hello</p>
```

### Framework-specific Usage

#### React

```typescript
import { stripInlineStyles } from 'strip-inline-styles';

function MyComponent() {
  const htmlContent = '<div style="color: red;">Hello React!</div>';
  const cleanHtml = stripInlineStyles(htmlContent);

  return <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
}
```

#### Angular

```typescript
import { Component } from "@angular/core";
import { stripInlineStyles } from "strip-inline-styles";

@Component({
  selector: "app-my-component",
  template: ` <div [innerHTML]="cleanHtml"></div> `,
})
export class MyComponent {
  htmlContent = '<div style="color: red;">Hello Angular!</div>';
  cleanHtml = stripInlineStyles(this.htmlContent);
}
```

#### Vue

```vue
<template>
  <div v-html="cleanHtml"></div>
</template>

<script>
import { stripInlineStyles } from "strip-inline-styles";

export default {
  data() {
    return {
      htmlContent: '<div style="color: red;">Hello Vue!</div>',
    };
  },
  computed: {
    cleanHtml() {
      return stripInlineStyles(this.htmlContent);
    },
  },
};
</script>
```

#### Node.js

```typescript
import { stripInlineStyles } from "strip-inline-styles";

const html = '<p style="color: red;">Hello Node.js!</p>';
const result = stripInlineStyles(html);
console.log(result);
// Output: <p>Hello Node.js!</p>
```

### Remove Specific Styles

```typescript
import { stripInlineStyles } from "strip-inline-styles";

const html = '<p style="color: red; font-size: 16px; margin: 10px;">Hello</p>';
const result = stripInlineStyles(html, {
  removeSpecificStyles: ["color", "font-size"],
});
console.log(result);
// Output: <p style="margin: 10px;">Hello</p>
```

### Handle Complex HTML

```typescript
import { stripInlineStyles } from "strip-inline-styles";

const html = `
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

const result = stripInlineStyles(html);
console.log(result);
// Output: Clean HTML with all inline styles removed
```

## API

### `stripInlineStyles(html: string, options?: Options): string`

#### Parameters

- `html` (string): The HTML string to process
- `options` (object, optional): Configuration options
  - `removeSpecificStyles` (string[], optional): Array of specific style properties to remove
  - `preserveClasses` (boolean, optional): Whether to preserve class attributes (default: true)

#### Returns

- (string): The processed HTML with inline styles removed

## Browser Support

The library works in all modern browsers and Node.js environments. No dependencies required.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request to the [GitHub repository](https://github.com/nati-grossman/strip-inline-styles).

## License

MIT License - feel free to use this project in any way you want.

## Author

[Nati Grossman](https://github.com/nati-grossman)

## Support

If you find this package helpful, please consider giving it a star on [GitHub](https://github.com/nati-grossman/strip-inline-styles)!
