interface EnhancedInputEventInit extends InputEventInit {
	// Wait for https://github.com/DefinitelyTyped/DefinitelyTyped/issues/33903
	inputType: string;
}

function insertText(textarea: HTMLTextAreaElement, text: string) {
	// Replace selection with text, with Firefox support
	// Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=1220696
	// Solution: https://www.everythingfrontend.com/posts/insert-text-into-textarea-at-cursor-position.html 🎈
	textarea.focus(); // The passed `textarea` may not be focused
	if (!document.execCommand('insertText', false, text)) {
		textarea.setRangeText(
			text,
			textarea.selectionStart,
			textarea.selectionEnd,
			'end' // Without this, the cursor is either at the beginning or `text` remains selected
		);
		textarea.dispatchEvent(new InputEvent('input', <EnhancedInputEventInit>{
			data: text,
			inputType: 'insertText'
		}));
	}
}

function indentTextarea(el: HTMLTextAreaElement): void {
	const {selectionStart, selectionEnd, value} = el;
	const linesCount = value.slice(selectionStart, selectionEnd).match(/^|\n/g)!.length;

	if (linesCount > 1) {
		// Select full first line to replace everything at once
		const firstLineStart = value.lastIndexOf('\n', selectionStart) + 1;
		el.setSelectionRange(firstLineStart, selectionEnd);

		const newSelection = el.value.slice(firstLineStart, selectionEnd);
		const indentedText = newSelection.replace(
			/^|\n/g, // Match all line starts
			'$&\t'
		);

		// Replace newSelection with indentedText
		insertText(el, indentedText);

		// Restore selection position, including the indentation
		el.setSelectionRange(selectionStart + 1, selectionEnd + linesCount);
	} else {
		insertText(el, '\t');
	}
}

function watchListener(event: Event): void {
	const tsEvent = event as KeyboardEvent; // TODO: find a way around this ugly TypeScript workaround
	if (tsEvent.key === 'Tab' && !tsEvent.shiftKey) {
		indentTextarea(tsEvent.target as HTMLTextAreaElement);
		tsEvent.preventDefault();
	}
}

type WatchableElements =
	| string
	| HTMLTextAreaElement
	| HTMLTextAreaElement[]
	| NodeListOf<HTMLTextAreaElement>;
function watch(elements: WatchableElements): void {
	if (typeof elements === 'string') {
		elements = document.querySelectorAll(elements);
	} else if (elements instanceof HTMLTextAreaElement) {
		elements = [elements];
	}

	for (const element of elements) {
		element.addEventListener('keydown', watchListener);
	}
}

indentTextarea.watch = watch;

module.exports = indentTextarea;
export default indentTextarea;
