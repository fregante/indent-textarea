import test from 'tape';
import {unindentSelection} from '../index.js';
import {getField, getState} from './_tools.js';

test('unindent empty field (noop)', t => {
	const textarea = getField();
	t.equal(getState(textarea), '|');
	unindentSelection(textarea);
	t.equal(getState(textarea), '|');
	t.end();
});

test('unindent filled field (start)', t => {
	const textarea = getField('\t|hello');
	t.equal(getState(textarea), '\t|hello');
	unindentSelection(textarea);
	t.equal(getState(textarea), '|hello');
	t.end();
});

test('unindent filled field (middle)', t => {
	const textarea = getField('\thel|lo');
	t.equal(getState(textarea), '\thel|lo');
	unindentSelection(textarea);
	t.equal(getState(textarea), 'hel|lo');
	t.end();
});

test('unindent filled field (between tabs)', t => {
	const textarea = getField('\t|\thello');
	t.equal(getState(textarea), '\t|\thello');
	unindentSelection(textarea);
	t.equal(getState(textarea), '|\thello');
	t.end();
});

test('unindent filled field (end)', t => {
	const textarea = getField('\thello|');
	t.equal(getState(textarea), '\thello|');
	unindentSelection(textarea);
	t.equal(getState(textarea), 'hello|');
	t.end();
});

test('unindent line with selection without replacing it', t => {
	const textarea = getField('\the{ll}o');
	t.equal(getState(textarea), '\the{ll}o');
	unindentSelection(textarea);
	t.equal(getState(textarea), 'he{ll}o');
	t.end();
});

test('unindent every selected line', t => {
	const textarea = getField('{\t\ta\nb\n\t\tc}');
	t.equal(getState(textarea), '{\t\ta\nb\n\t\tc}');
	unindentSelection(textarea);
	t.equal(getState(textarea), '{\ta\nb\n\tc}');
	unindentSelection(textarea);
	t.equal(getState(textarea), '{a\nb\nc}');
	t.end();
});

test('unindent every line counting from the linebreak itself', t => {
	const textarea = getField('\ta{\n\tb\n\tc}');
	t.equal(getState(textarea), '\ta{\n\tb\n\tc}');
	unindentSelection(textarea);
	t.equal(getState(textarea), 'a{\nb\nc}');
	t.end();
});

test('unindent every line stopping before the last linebreak', t => {
	const textarea = getField('\ta{\n\tb\n}c');
	t.equal(getState(textarea), '\ta{\n\tb\n}c');
	unindentSelection(textarea);
	t.equal(getState(textarea), 'a{\nb\n}c');
	t.end();
});

test('unindent every line (following both the previous rules)', t => {
	const textarea = getField('\ta{\n}b\nc');
	t.equal(getState(textarea), '\ta{\n}b\nc');
	unindentSelection(textarea);
	t.equal(getState(textarea), 'a{\n}b\nc');
	t.end();
});

test('preserve cursor position when deindenting after it', t => {
	const textarea = getField('\t\n|\t');
	t.equal(getState(textarea), '\t\n|\t');
	unindentSelection(textarea);
	t.equal(getState(textarea), '\t\n|');
	unindentSelection(textarea);
	t.end();
});

test('ignore whitespace on other lines', t => {
	let textarea = getField('\t\n\t|\t\n\t');
	t.equal(getState(textarea), '\t\n\t|\t\n\t');
	unindentSelection(textarea);
	t.equal(getState(textarea), '\t\n|\t\n\t');
	unindentSelection(textarea);

	textarea = getField('\t\t\t\t\n\t|\n\t');
	t.equal(getState(textarea), '\t\t\t\t\n\t|\n\t');
	unindentSelection(textarea);
	t.equal(getState(textarea), '\t\t\t\t\n|\n\t');

	// TODO: Fix this test, it used to work
	// unindent(textarea);
	// t.equal(getState(textarea), '\t\t\t\t\n|\n\t');

	textarea = getField('     \t\n  |\n\t');
	t.equal(getState(textarea), '     \t\n  |\n\t');
	unindentSelection(textarea);
	t.equal(getState(textarea), '     \t\n|\n\t');

	t.end();
});

test.skip('ignore trailing whitespace', t => {
	const textarea = getField('a\t\t|');
	t.equal(getState(textarea), 'a\t\t|');
	unindentSelection(textarea);
	t.equal(getState(textarea), 'a\t\t|');
	t.end();
});

test('unindent 2 spaces', t => {
	const textarea = getField('    hel|lo');
	t.equal(getState(textarea), '    hel|lo');
	unindentSelection(textarea);
	t.equal(getState(textarea), '  hel|lo');
	unindentSelection(textarea);
	t.equal(getState(textarea), 'hel|lo');
	t.end();
});

test('unindent mixed spaces and tabs', t => {
	const textarea = getField('  \t  hel|lo');
	t.equal(getState(textarea), '  \t  hel|lo');
	unindentSelection(textarea);
	t.equal(getState(textarea), '\t  hel|lo');
	unindentSelection(textarea);
	t.equal(getState(textarea), '  hel|lo');
	t.end();
});
