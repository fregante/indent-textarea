# indent-textarea [![Build Status](https://api.travis-ci.com/bfred-it/indent-textarea.svg?branch=master)](https://travis-ci.com/bfred-it/indent-textarea)

<img align="right" src="https://user-images.githubusercontent.com/1402241/33802977-beb8497c-ddbf-11e7-899c-698d89298de4.gif">

> Add editor-like tab-to-indent functionality to `<textarea>`, in a few bytes

Also supports the native undo functionality (<kbd>ctrl+z</kbd>, <kbd>cmd+z</kbd>, context menu), as seen in the gif on the side.

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
