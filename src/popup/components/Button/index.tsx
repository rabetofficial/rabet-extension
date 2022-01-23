import classNames from 'classnames';
import { any } from 'prop-types';
import React, { CSSProperties } from 'react';
import './styles.less';

type ButtonTypes = {
	disabled?: boolean;
	content: JSX.Element | string;
	variant: string;
	type: string | any;
	size: 'small' | 'medium' | 'large';
	style?: CSSProperties;
	onClick: () => void;
	className: string | any;
};
const Button = (props: ButtonTypes) => {
	const { type, variant, size, disabled, style, onClick, className, content } = props;
	return (
		<button
			type={type}
			disabled={disabled}
			className={classNames(variant, size, className)}
			onClick={onClick}
			style={style}
		>
			{content}
		</button>
	);
};

Button.defaultProps = {
	disabled: false,
	onClick: () => {},
	style: {},
	type: 'button',
	size: '',
	className: '',
};

export default Button;
