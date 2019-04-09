import test from 'ava';
import withBrowser from './tests/helpers/with-browser';
import indentTextarea from '.';

test('add single tab without selection', withBrowser, async (t, field) => {
	field.value = 'hello';
	indentTextarea(field);
	t.is(field.value, '\thello');
});
