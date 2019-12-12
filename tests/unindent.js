import test from 'tape';
import {getField, getState} from './_tools';
import {unindent} from '..';

test('undindent empty field (noop)', t => {
	const textarea = getField();
	t.equal(getState(textarea), '|');
	unindent(textarea);
	t.equal(getState(textarea), '|');
	t.end();
});

test('undindent filled field (start)', t => {
	const textarea = getField('\thello|');
	t.equal(getState(textarea), '\thello|');
	unindent(textarea);
	t.equal(getState(textarea), 'hello|');
	t.end();
});

test('undindent filled field (middle)', t => {
	const textarea = getField('\thel|lo');
	t.equal(getState(textarea), '\thel|lo');
	unindent(textarea);
	t.equal(getState(textarea), 'hel|lo');
	t.end();
});

test('undindent filled field (between tabs)', t => {
	const textarea = getField('\t|\thello');
	t.equal(getState(textarea), '\t|\thello');
	unindent(textarea);
	t.equal(getState(textarea), '|\thello');
	t.end();
});

test('undindent filled field (end)', t => {
	const textarea = getField('|\thello');
	t.equal(getState(textarea), '|\thello');
	unindent(textarea);
	t.equal(getState(textarea), '|hello');
	t.end();
});

test('undindent line with selection without replacing it', t => {
	const textarea = getField('\the{ll}o');
	t.equal(getState(textarea), '\the{ll}o');
	unindent(textarea);
	t.equal(getState(textarea), 'he{ll}o');
	t.end();
});

test('undindent every selected line', t => {
	const textarea = getField('{\t\ta\nb\n\t\tc}');
	t.equal(getState(textarea), '{\t\ta\nb\n\t\tc}');
	unindent(textarea);
	t.equal(getState(textarea), '{\ta\nb\n\tc}');
	unindent(textarea);
	t.equal(getState(textarea), '{a\nb\nc}');
	t.end();
});

test('undindent every line counting from the linebreak itself', t => {
	const textarea = getField('\ta{\n\tb\n\tc}');
	t.equal(getState(textarea), '\ta{\n\tb\n\tc}');
	unindent(textarea);
	t.equal(getState(textarea), 'a{\nb\nc}');
	t.end();
});

test('undindent every line stopping before the last linebreak', t => {
	const textarea = getField('\ta{\n\tb\n}c');
	t.equal(getState(textarea), '\ta{\n\tb\n}c');
	unindent(textarea);
	t.equal(getState(textarea), 'a{\nb\n}c');
	t.end();
});

test('undindent every line (following both the previous rules)', t => {
	const textarea = getField('\ta{\n}b\nc');
	t.equal(getState(textarea), '\ta{\n}b\nc');
	unindent(textarea);
	t.equal(getState(textarea), 'a{\n}b\nc');
	t.end();
});
