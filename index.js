/**
 * Warning: just a proof of concept!
 *
 * Proper version should build an AST and work from it.
 */

var dic0 = require( './lib/dictionary-level0' ),
	dic1 = require( './lib/dictionary-level1' ),
	dic2 = require( './lib/dictionary-level2' ),
	rules = []

// Build all regular expressions and map them
dic0.forEach( function ( zero, zeroI ) {
	dic1.forEach( function ( one, oneI ) {
		dic2.forEach( function ( two, twoI ) {
			rules.push( {
				regexp: zero +'\\s*\\(\\s*(\'|")\\s*'+ one.regexp +'\\s*\\1\\s*\\)\\s*\\.\\s*'+ two.regexp,
				type: one.type,
				selector: one.fn,
				command: two.fn,
				debug: [ zeroI, oneI, twoI ]
			} )
		} )
	} )
} )

var unjquerify = function Unjquerify ( src, options ) {
	options = options || {};
	options.variablePrefix = 'UNJQUERIFY_';

	var splice = Array.prototype.splice,
		variables = [ 'A', 'B', 'C', 'D', 'E' ].map( function ( x ) { return options.variablePrefix +'_'+ x } ),
		single = multiple = 0
	rules.forEach( function ( rule, i ) {
		var regexp = new RegExp( rule.regexp, 'ig' ),
			match
		src = src.replace( regexp, function ( ) {
			var result = '',
				selector = rule.selector.apply( false, splice.call( arguments, 2, rule.selector.length ) ),
				command = ''
			if ( rule.type == 'single' ) {
				single++
				command = rule.command.apply( false, [ selector ].concat( splice.call( arguments, rule.selector.length + 1 ) ) )
				result += 'if('+ selector +'){'+ command +'}'
			}
			else if ( rule.type == 'multiple' ) {
				multiple++
				command = rule.command.apply( false, [ variables[0] +'['+ variables[2] +']' ].concat( splice.call( arguments, rule.selector.length + 1 ) ) )
				result += variables[0] +'='+ selector +';if('+ variables[0] +'.length)'+
						'for('+ variables[1] +'='+ variables[0] +'.length,'+ variables[2] +'=0;'+ variables[2] +'<'+ variables[1] +';'+ variables[2] +'++){'+ command +'}'
			}
			return result;
		} )
	} )
	return 'var '+ variables.join( ',' ) +';'+ src;
}

module.exports = unjquerify