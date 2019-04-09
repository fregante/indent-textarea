import test from 'ava';
import withBrowser from './tests/helpers/with-browser';
import indentTextarea from '.';

test('add single tab without selection', withBrowser, async (t, page) => {
	t.context.field.value = 'hello';
	indentTextarea(t.context.field);
	t.is(t.context.field.value, '\thello');
});
