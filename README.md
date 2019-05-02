# FileJet - React integration

React library which provides an easy drop-in solution for your images.

## Installation

```
npm install filejet-react --save
```

## Example

```jsx
import { FilejetProvider, Img } from 'filejet-react';
import React from 'react';

function App() {
  return (
    <FilejetProvider config={{ storageId: 'abc123' }}>
      <Img src="https://example.com/img.jpg" width={200} height={200} alt="..." />
    </FilejetProvider>
  );
}
```

## Components

### `<FilejetProvider>`

All components require `<FilejetProvider>` with the necessary config:

- **storageId**: your storage ID _(required)_
- **maxDPR**: maximum DPR, which srcsets should support _(defaults to 2)_

#### Example

```js
<FilejetProvider config={{ storageId: 'abc123', maxDPR: 4 }}>
  <div>...</div>
</FilejetProvider>
```

### `<Img>`

Use `<Img>` to render FileJet image.

Optionally, provide width or height or both to fetch the image of the right size.
Source sets for high DPI devices will be generated automatically.

#### Properties

| Name           | Description                                   | type             | example                            |
| -------------- | --------------------------------------------- | ---------------- | ---------------------------------- |
| src            | file ID or absolute path to external file     | string, required | "80c1ae98f9d020a80c1ae98f9dd4020a" |
| width          | expected width in pixels                      | number, optional | 200                                |
| height         | expected height in pixels                     | number, optional | 200                                |
| srcMutation    | custom mutation - ignores width/height        | string, optional | resize_300x300,crop_200x200_10_10  |
| srcSetMutation | custom srcset mutation - ignores width/height | object, optional | { '200w': 'resize_200x200' }       |

💡 Component also accepts all `<img>` attributes _(alt, sizes, etc.)_ except `srcset`.

#### Example

```jsx
<Img src="80c1ae98f9d020a80c1ae98f9dd4020a" width={200}>
<Img src="80c1ae98f9d020a80c1ae98f9dd4020a" height={200}>
<Img src="80c1ae98f9d020a80c1ae98f9dd4020a" width={200} height={200}>
<Img src="80c1ae98f9d020a80c1ae98f9dd4020a" srcMutation="fit_200x200">
<Img src="https://example.com/image.jpg" srcSetMutation={{ '1x': 'resize_10x10', '2x': 'crop_20x20'}}>
```

<hr>

**🚀 Powered by FileJet!**
