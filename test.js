import test from 'ava';
import withBrowser from './tests/helper/withBrowser';
import indentTextarea from '.';

test('add single tab without selection', withBrowser, async (t, page) => {
	await page.goto(url);
	t.context.field.value = 'hello';
	indentTextarea(t.context.field);
	t.is(t.context.field.value, '\thello');
});
