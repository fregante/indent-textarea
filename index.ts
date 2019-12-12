import insertText from 'insert-text-textarea';

function indentTextarea(el: HTMLTextAreaElement): void {
	const {selectionStart, selectionEnd, value} = el;
	const selectedText = value.slice(selectionStart, selectionEnd);
	// The first line should be indented, even if it starts with `\n`
	// The last line should only be indented if includes any character after `\n`
	const lineBreakCount = /\n/g.exec(selectedText)?.length;

	if (lineBreakCount! > 0) {
		// Select full first line to replace everything at once
		const firstLineStart = value.lastIndexOf('\n', selectionStart - 1) + 1;
		el.setSelectionRange(firstLineStart, selectionEnd - 1);

		const newSelection = el.value.slice(firstLineStart, selectionEnd - 1);
		const indentedText = newSelection.replace(
			/^|\n/g, // Match all line starts
			'$&\t'
		);
		const replacementsCount = indentedText.length - newSelection.length;

		// Replace newSelection with indentedText
		insertText(el, indentedText);

		// Restore selection position, including the indentation
		el.setSelectionRange(selectionStart + 1, selectionEnd + replacementsCount);
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
function watchAndIndent(elements: WatchableElements): void {
	if (typeof elements === 'string') {
		elements = document.querySelectorAll(elements);
	} else if (elements instanceof HTMLTextAreaElement) {
		elements = [elements];
	}

	for (const element of elements) {
		element.addEventListener('keydown', watchListener);
	}
}

indentTextarea.watch = watchAndIndent;

export default indentTextarea;
