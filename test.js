import test from 'ava';
import withBrowser from './test-helper.js';
import indentTextarea from '.';

test('add single tab without selection', withPage, async (t, page) => {
	await page.goto(url);
	t.context.field.value = 'hello';
	indentTextarea(t.context.field);
	t.is(t.context.field.value, '\thello');
});
