export function getField(state = '') {
	const field = document.createElement('textarea');
	const cursor = state.indexOf('|');
	const selectionStart = state.indexOf('{');
	const selectionEnd = state.indexOf('}') - 1;
	field.value = state.replaceAll(/[{|}]/g, '');
	field.selectionStart = cursor >= 0 ? cursor : selectionStart;
	field.selectionEnd = cursor >= 0 ? cursor : selectionEnd;
	document.body.append(field);
	return field;
}

export function getState({value, selectionStart, selectionEnd}) {
	if (selectionStart === selectionEnd) {
		return value.slice(0, selectionStart) + '|' + value.slice(selectionStart);
	}

	return (
		value.slice(0, selectionStart)
		+ '{'
		+ value.slice(selectionStart, selectionEnd)
		+ '}'
		+ value.slice(selectionEnd)
	);
}
