import insertText from 'insert-text-textarea';

export function indent(el: HTMLTextAreaElement): void {
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

export function unindent(el: HTMLTextAreaElement): void {
	const {selectionStart, selectionEnd, value} = el;

	// The first line should always be unindented
	// The last line should only be unindented if includes any character after `\n`

	// Select full first line to replace everything at once
	const firstLineStart = value.lastIndexOf('\n', selectionStart - 1) + 1;
	const minimumSelectionEnd = Math.max(selectionEnd, value.indexOf('\t', selectionStart) + 1);
	el.setSelectionRange(firstLineStart, minimumSelectionEnd);

	const newSelection = el.value.slice(firstLineStart, minimumSelectionEnd);
	const indentedText = newSelection.replace(
		/(^|\n)\t/g,
		'$1'
	);
	const replacementsCount = newSelection.length - indentedText.length;

	// Replace newSelection with indentedText
	insertText(el, indentedText);

	// Restore selection position, including the indentation
	el.setSelectionRange(
		Math.max(0, selectionStart - Number(newSelection.startsWith('\t'))),
		Math.max(0, selectionEnd - replacementsCount)
	);
}

export function eventHandler(event: KeyboardEvent): void {
	if (event.defaultPrevented) {
		return;
	}

	const textarea = event.target as HTMLTextAreaElement;

	if (event.key === 'Tab') {
		if (event.shiftKey) {
			unindent(textarea);
		} else {
			indent(textarea);
		}

		event.preventDefault();
	}
}

type WatchableElements =
	| string
	| HTMLTextAreaElement
	| Iterable<HTMLTextAreaElement>;

export function watch(elements: WatchableElements): void {
	if (typeof elements === 'string') {
		elements = document.querySelectorAll(elements);
	} else if (elements instanceof HTMLTextAreaElement) {
		elements = [elements];
	}

	for (const element of elements) {
		element.addEventListener('keydown', eventHandler);
	}
}
