const test = require('tape');
const indent = require('.');

const getField = (value = '', start, end) => {
	const field = document.createElement('textarea');
	field.value = value;
	document.body.append(field);
	if (end !== undefined) {
		field.selectionStart = start;
		field.selectionEnd = end;
	}

	return field;
};

test('insert tab in empty field', t => {
	const textarea = getField();
	t.equal(textarea.value, '');
	indent(textarea);
	t.equal(textarea.value, '\t');
	indent(textarea);
	t.equal(textarea.value, '\t\t');
	t.equal(textarea.selectionStart, 2);
	t.equal(textarea.selectionEnd, 2);
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
	t.equal(textarea.selectionStart, 2);
	t.equal(textarea.selectionEnd, 2);
	t.end();
});

test('insert tab on every selected line', t => {
	const textarea = getField('a\nb', 0, 3);
	indent(textarea);
	t.equal(textarea.value, '\ta\n\tb');
	t.equal(textarea.selectionStart, 1); // Before 'a'
	t.equal(textarea.selectionEnd, 5); // After 'b'

	indent(textarea);
	t.equal(textarea.value, '\t\ta\n\t\tb');
	t.equal(textarea.selectionStart, 2); // Before 'a'
	t.equal(textarea.selectionEnd, 7); // After 'b'
	t.end();
});
