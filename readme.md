# indent-textarea [![][badge-gzip]](#link-npm)

  [badge-gzip]: https://img.shields.io/bundlephobia/minzip/indent-textarea.svg?label=gzipped
  [link-npm]: https://www.npmjs.com/package/indent-textarea

<img align="right" src="https://user-images.githubusercontent.com/1402241/33802977-beb8497c-ddbf-11e7-899c-698d89298de4.gif">

> Add editor-like tab-to-indent functionality to `<textarea>`, in a few bytes

- Supports the native undo functionality (<kbd>ctrl+z</kbd>, <kbd>cmd+z</kbd>, context menu), as seen in the gif on the side.
- Supports also Firefox (a lot of solutions online don't because of [bugs](https://bugzilla.mozilla.org/show_bug.cgi?id=1220696) and [deprecations](https://www.chromestatus.com/features/5718803933560832)) but without undo support.

This only supports tabbing on the current line but it doesn't preserve it for the next line like a full code editor would (e.g. when pressing <kbd>enter</kbd>). If you need a more complete solution, check out [behave.js](https://github.com/jakiestfu/Behave.js) (outdated, no _undo_) or [CodeMirror](https://github.com/codemirror/CodeMirror) (much heavier).

**Note:** the API used (`document.execCommand`) will trigger multiple `input` events when multiple lines are selected, so if you have a listener on the `textarea`, make sure to [debounce](https://github.com/sindresorhus/debounce-fn) it.

## Install

You can just download the [standalone bundle](https://packd.fregante.now.sh/indent-textarea)

Or use `npm`:

```
npm install indent-textarea
```

```js
// This module is only offered as a ES Module
import * as indentation from 'indent-textarea';
```

## Usage

You can listen to <kbd>tab</kbd> and <kbd>shift+tab</kbd> to indent and unindent respectively.

```js
const textarea = document.querySelector('textarea');
indentation.watch(textarea);
```

If you prefer [event delegation](https://github.com/fregante/delegate-it):

```js
import delegate from 'delegate-it';
import {eventHandler} from 'indent-textarea';

delegate(document.body, 'textarea', 'input', eventHandler);
```

# Related

- [insert-text-textarea](https://github.com/fregante/insert-text-textarea) - Insert text in a textarea (supports Firefox and Undo). Used by this module.
- [fit-textarea](https://github.com/fregante/fit-textarea) - Automatically expand a `<textarea>` to fit its content, in a few bytes.
- [delegate-it](https://github.com/fregante/delegate-it) - DOM event delegation, in <1KB. Can be used to attach one `indent-textarea` to many elements.
- [Refined GitHub](https://github.com/sindresorhus/refined-github) - Uses this module.
