'use strict'

module.exports = [
	{
		regexp: 'hide\\s*\\(\\s*\\)',
		fn: function ( el ) {
			return el +'.style.display="none"'
		},
	},
	{
		regexp: 'show\\s*\\(\\s*\\)',
		fn: function ( el ) {
			return el +'.style.display=""'
		},
	},
	{
		regexp: 'addClass\\	s*\\(\\s*("|\\\')([A-Z0-9_-]+)("|\\\')\\s*\\)',
		fn: function ( el, quote1, className, quote2 ) {
			return el +'.classList?'+ el +'.classList.add('+ JSON.stringify( className ) +'):('+ el +'.className+=" "+'+ JSON.stringify( className ) +')'
		},
	},
	{
		regexp: 'removeClass\\s*\\(\\s*("|\\\')([A-Z0-9_-]+)("|\\\')\\s*\\)',
		fn: function ( el, quote1, className, quote2 ) {
			return el +'.classList?'+ el +'.classList.remove('+ JSON.stringify( className ) +'):('+ el +'.className='+ el +'.className.replace(new RegExp('+ JSON.stringify( '(^|\b)'+ className +'(\b|$)' ) +',\'gi\'),\' \'))'
		},
	}
]