# Unjquerify

Unjquerify is a JavaScript preprocessor that tries to find common jQuery usages and convert them to vanilla JavaScript, or as close to vanilla as currently possible.

**This is a proof of concept, just a bunch of simple regular expression replaces!**

## Example

Input:

	$("#my-div").hide()

Output:

	if(document.getElementById("my-div")){document.getElementById("my-div").style.display="none"}

## Usage

	var unjquerify = require('unjquerify')

	console.log( unjquerify( "$('#my-div').hide()" ) )

## Supported Translations

* `jQuery` and `$`
* `#id` translating to `getElementById`
* `.class` translating to `querySelectorAll`
* `.show()`
* `.hide()`
* `.addClass( oneClassOnlySVP )`
* `.removeClass( oneClassOnlyAUB )`

## How it works

Currently, this script translates jQuery calls on three levels:

	jQuery( selector ).command( parameters )
	------  --------  ----------------------
	^       ^         ^
	|       |         '-- JS command that runs on the selected element
	|       |
	|       '-- Selector
	|
	'-- jQuery variable

Each level is a regular expression, described by a dictionary:

* `lib/dictionary-level0.js`
* `lib/dictionary-level1.js`
* `lib/dictionary-level2.js`

**Level 0** is the simple list of jQuery variables to look for.

**Level 1** contains regular expressions of the selectors, that can be single or multiple. Multiple
selectors will generate a for loop. Receives all its regular expression backreferences as
arguments.

**Level 2** will determine the commands. Receives the JS code for usage as the selector as its
argument, plus all its regular expression backreferences, like level 1.

Check the files for more details on usage.

## Moving Forward

It is my intention to test this in the real world and implement more simple translations. If this
proves useful, a rewrite using AST and deeper translations must be done.

## Inspiration and Thanks

[You might not need jQuery](http://youmightnotneedjquery.com/)