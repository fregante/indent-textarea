import test from 'tape';
import {indentSelection} from '../index.js';
import {getField, getState} from './_tools.js';

test('insert tab in empty field', t => {
	const textarea = getField();
	t.equal(getState(textarea), '|');
	indentSelection(textarea);
	t.equal(getState(textarea), '\t|');
	indentSelection(textarea);
	t.equal(getState(textarea), '\t\t|');
	t.end();
});

test('insert tab in filled field (start)', t => {
	const textarea = getField('|hello');
	t.equal(getState(textarea), '|hello');
	indentSelection(textarea);
	t.equal(getState(textarea), '\t|hello');
	t.end();
});

test('insert tab in filled field (end)', t => {
	const textarea = getField('hello|');
	t.equal(getState(textarea), 'hello|');
	indentSelection(textarea);
	t.equal(getState(textarea), 'hello\t|');
	t.end();
});

test('insert tab and replace selection', t => {
	const textarea = getField('he{ll}o');
	t.equal(getState(textarea), 'he{ll}o');
	indentSelection(textarea);
	t.equal(getState(textarea), 'he\t|o');
	t.end();
});

test('indent every selected line', t => {
	const textarea = getField('{a\nb\nc}');
	t.equal(getState(textarea), '{a\nb\nc}');
	indentSelection(textarea);
	t.equal(getState(textarea), '\t{a\n\tb\n\tc}');
	indentSelection(textarea);
	t.equal(getState(textarea), '\t\t{a\n\t\tb\n\t\tc}');
	t.end();
});

test('indent every line counting from the linebreak itself', t => {
	const textarea = getField('a{\nb\nc}');
	t.equal(getState(textarea), 'a{\nb\nc}');
	indentSelection(textarea);
	t.equal(getState(textarea), '\ta{\n\tb\n\tc}');
	t.end();
});

test('indent every line stopping before the last linebreak', t => {
	const textarea = getField('a{\nb\n}c');
	t.equal(getState(textarea), 'a{\nb\n}c');
	indentSelection(textarea);
	t.equal(getState(textarea), '\ta{\n\tb\n}c');
	t.end();
});

test('indent every line (following both the previous rules)', t => {
	const textarea = getField('a{\n}b\nc');
	t.equal(getState(textarea), 'a{\n}b\nc');
	indentSelection(textarea);
	t.equal(getState(textarea), '\ta{\n}b\nc');
	t.end();
});
