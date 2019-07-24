# indent-textarea [![(size)][badge-gzip]](#no-link) [![(status)][badge-travis]][link-travis]

  [badge-gzip]: https://img.shields.io/bundlephobia/minzip/indent-textarea.svg?label=gzipped
  [badge-travis]: https://api.travis-ci.com/fregante/indent-textarea.svg
  [link-travis]: https://travis-ci.com/fregante/indent-textarea

<img align="right" src="https://user-images.githubusercontent.com/1402241/33802977-beb8497c-ddbf-11e7-899c-698d89298de4.gif">

> Add editor-like tab-to-indent functionality to `<textarea>`, in a few bytes

- Supports the native undo functionality (<kbd>ctrl+z</kbd>, <kbd>cmd+z</kbd>, context menu), as seen in the gif on the side.
- Supports also Firefox (a lot of solutions online don't because of [bugs](https://bugzilla.mozilla.org/show_bug.cgi?id=1220696) and [deprecations](https://www.chromestatus.com/features/5718803933560832)) but without undo support.

This only supports tabbing on the current line but it doesn't preserve it for the next line like a full code editor would (e.g. when pressing <kbd>enter</kbd>). If you need a more complete solution, check out [behave.js](https://github.com/jakiestfu/Behave.js) (outdated, no _undo_) or [CodeMirror](https://github.com/codemirror/CodeMirror) (much heavier).

**Note:** the API used (`document.execCommand`) will trigger multiple `input` events when multiple lines are selected, so if you have a listener on the `textarea`, make sure to [debounce](https://github.com/sindresorhus/debounce-fn) it.

## Install

```
npm install indent-textarea
```

## Setup

```js
const indentTextarea = require('indent-textarea');
```

```js
import indentTextarea from 'indent-textarea';
```

## Usage

### Once, one element

This will add a <kbd>tab</kbd> where the caret/selection is in the textarea. It's not meant to be used directly.

```js
const textarea = document.querySelector('textarea');
indentTextarea(textarea);
```

### When the user presses <kbd>tab</kbd>

#### One element

```js
const textarea = document.querySelector('textarea');
indentTextarea.watch(textarea);
```

#### Array/NodeList/Iterable of elements

```js
const textareas = document.querySelectorAll('textarea');
indentTextarea.watch(textareas);
```

#### With a selector

The selector is run once, so it's equivalent to the example above.

```js
indentTextarea.watch('textarea');
```

# Related

- [insert-text-textarea](https://github.com/fregante/insert-text-textarea) - Insert text in a textarea (supports Firefox and Undo). Used by this module.
- [fit-textarea](https://github.com/fregante/fit-textarea) - Automatically expand a `<textarea>` to fit its content, in a few bytes.
- [delegate-it](https://github.com/fregante/delegate-it) - DOM event delegation, in <1KB. Can be used to attach one `indent-textarea` to many elements.
- [Refined GitHub](https://github.com/sindresorhus/refined-github) - Uses this module.
