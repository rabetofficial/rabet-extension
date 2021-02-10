module.exports = {
	extends: 'airbnb',
	parser: 'babel-eslint',
	rules: {
		'no-restricted-syntax': 0,
    'no-console': 0,
    'operator-assignment': [2, 'never'],
		'prefer-destructuring': 0,
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 0,
    'react/no-array-index-key': 0,
    // 'react/prop-types': 0,
    'react/jsx-filename-extension': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-one-expression-per-line': 0,
    // 'jsx-a11y/no-static-element-interactions': 0,
    // 'jsx-a11y/click-events-have-key-events': 0,
	},
};
