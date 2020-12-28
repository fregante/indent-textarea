# indent-textarea [![][badge-gzip]][link-npm]

[badge-gzip]: https://img.shields.io/bundlephobia/minzip/indent-textarea.svg?label=gzipped
[link-npm]: https://www.npmjs.com/package/indent-textarea

[<img align="right" src="https://user-images.githubusercontent.com/1402241/33802977-beb8497c-ddbf-11e7-899c-698d89298de4.gif">](https://fregante.github.io/indent-textarea/)

> Add editor-like tab-to-indent functionality to `<textarea>`, in a few bytes

Try the [demo](https://fregante.github.io/indent-textarea/).

- Supports the native undo functionality (<kbd>ctrl+z</kbd>, <kbd>cmd+z</kbd>, context menu), as seen in the gif on the side.
- Supports also Firefox (a lot of solutions online don't because of [bugs](https://bugzilla.mozilla.org/show_bug.cgi?id=1220696) and [deprecations](https://www.chromestatus.com/features/5718803933560832)) but without undo support.

This only supports <kbd>tab</kbd> and <kbd>shift+tab</kbd> but it doesn't preserve it on <kbd>enter</kbd> like a full code editor would. If you need a more complete solution, check out [behave.js](https://github.com/jakiestfu/Behave.js) (outdated, no _undo_) or [CodeMirror](https://github.com/codemirror/CodeMirror) (much heavier).

**Note:** the API used (`document.execCommand`) will trigger multiple `input` events when multiple lines are selected, so if you have a listener on the `textarea`, make sure to [debounce](https://github.com/sindresorhus/debounce-fn) it.

## Install

You can just download the [standalone bundle](https://packd.fregante.now.sh/indent-textarea@latest?name=indentation) (it might take a minute to download)

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

If you prefer the raw `indent`/`unindent` methods, they're also available below.

## API

### indentation.watch(textarea)

Adds <kbd>tab</kbd> and <kbd>shift+tab</kbd> event listeners to the provided `textarea`(s).

#### textarea

Type: `HTMLTextAreaElement` `string` `Iterable<HTMLTextAreaElement>`

This can be:

- the `<textarea>` DOM element
- an array/iterable of DOM elements
- or a selector that will be used via `document.querySelectorAll` (it will watch all the selected elements)

### indentation.indent(textarea)

Raw method to indent the selected text in the provided `<textarea>` element, once, instantly.

#### textarea

Type: `HTMLTextAreaElement`

### indentation.unindent(textarea)

Raw method to unindent the selected text in the provided `<textarea>` element, once, instantly.

#### textarea

Type: `HTMLTextAreaElement`

### indentation.eventHandler

Type: `(event: KeyboardEvent) => void`

Raw event handler used by `indentation.watch` or to use manually via `addEventListener`

```js
document.querySelector('textarea').addEventListener('click', eventHandler);
```

Or with [event delegation](https://github.com/fregante/delegate-it):

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
