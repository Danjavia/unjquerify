'use strict'

module.exports = [
	{
		regexp: '#([A-Z0-9_-]+)',
		type: 'single',
		fn: function ( id ) {
			return 'document.getElementById("'+ id +'")'
		}
	},
	{
		regexp: '(\\.[A-Z0-9_-]+)',
		type: 'multiple',
		fn: function ( className ) {
			return 'document.querySelectorAll("'+ className +'")'
		}
	}
]