# Unjquerify

Unjquerify is a JavaScript preprocessor that tries to find common jQuery usages and convert them to
vanilla JavaScript, or as close to vanilla as currently possible.

This is currently the placeholder for the project, that has still to begin :)

## Example

Input:

	$('#my-div').hide();

Output:

	document.getElementById('my-div')&&(document.getElementById('my-div').style.display='none')