import test from 'tape';
import indent from '.';

const getField = (value = '', start = undefined, end = undefined) => {
	const field = document.createElement('textarea');
	field.value = value;
	document.body.append(field);
	if (end !== undefined) {
		field.selectionStart = start;
		field.selectionEnd = end;
	}

	return field;
};

function getSelection(field) {
	return [
		field.selectionStart,
		field.value.slice(field.selectionStart, field.selectionEnd)
	];
}

test('insert tab in empty field', t => {
	const textarea = getField();
	t.equal(textarea.value, '');
	indent(textarea);
	t.equal(textarea.value, '\t');
	indent(textarea);
	t.equal(textarea.value, '\t\t');
	t.deepEqual(getSelection(textarea), [2, '']);
	t.end();
});

test('insert tab in filled field', t => {
	const textarea = getField('hello');
	t.equal(textarea.value, 'hello');
	indent(textarea);
	t.equal(textarea.value, 'hello\t');
	t.equal(textarea.selectionStart, 6);
	t.equal(textarea.selectionEnd, 6);
	t.end();
});

test('insert tab and replace selection', t => {
	const textarea = getField('hello', 0, 4);
	indent(textarea);
	t.equal(textarea.value, '\to');
	t.equal(textarea.selectionStart, 1);
	t.equal(textarea.selectionEnd, 1);
	t.end();
});

test('insert tab on every selected line', t => {
	const textarea = getField('a\nb\nc', 0, 3);

	indent(textarea);
	t.equal(textarea.value, '\ta\n\tb\nc');
	t.equal(textarea.selectionStart, 1); // Before 'a'
	t.equal(textarea.selectionEnd, 5); // After 'b'

	indent(textarea);
	t.equal(textarea.value, '\t\ta\n\t\tb\nc');
	t.equal(textarea.selectionStart, 2); // Before 'a'
	t.equal(textarea.selectionEnd, 7); // After 'b'

	t.end();
});

test('insert tab on every selected line (counting from the first line break)', t => {
	const textarea = getField('a\nb\nc', 3, 4); // Only the linebreak between lines 2 and 3 is selected

	indent(textarea);
	t.equal(textarea.value, 'a\n\tb\nc');
	t.deepEqual(getSelection(textarea), [4, '\n']);

	textarea.selectionEnd = 6; // Include `c` in the selection
	indent(textarea);
	t.equal(textarea.value, 'a\n\t\tb\n\tc');
	t.deepEqual(getSelection(textarea), [5, '\n\tc']);

	t.end();
});
