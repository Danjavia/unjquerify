# Unjquerify

Unjquerify is a JavaScript preprocessor that tries to find common jQuery usages and convert them to
vanilla JavaScript, or as close to vanilla as currently possible.

**This is a proof of concept, just a bunch of simple regular expression replaces!**

## Example

Input:

	$("#my-div").hide()

Output:

	if(document.getElementById("my-div")){document.getElementById("my-div").style.display="none"}

## Usage

	var unjquerify = require('unjquerify')

	console.log( unjquerify( "$('#my-div').hide()" ) )