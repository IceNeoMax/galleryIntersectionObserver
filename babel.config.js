module.exports = {
	presets: [ [ '@babel/preset-env', { targets: { node: 'current' } } ], '@babel/preset-react' ],
	plugins: [
		[
			'@babel/plugin-transform-runtime',
			{
				regenerator: true
			}
		],
		'@babel/plugin-proposal-class-properties',
		'@babel/plugin-syntax-dynamic-import'
	],
	env: {
		production: {
			only: [ 'app' ],
			plugins: [
				'lodash',
				'transform-react-remove-prop-types',
				'@babel/plugin-transform-react-inline-elements',
				'@babel/plugin-transform-react-constant-elements'
			]
		},
		test: {
			plugins: [ '@babel/plugin-transform-modules-commonjs', 'dynamic-import-node' ]
		}
	}
};
