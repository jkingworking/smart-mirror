import React from 'react';
import PropTypes from 'prop-types';

function Widget ({className, children, ...rest}) {
	return (
		<div className={`component-widget ${className}`} {...rest}>
			{children}
		</div>
	);
}

Widget.propTypes = {
	className: PropTypes.string,
	Children: PropTypes.arrayOf(PropTypes.element)
};

Widget.defaultProps = {
	className: ''
};

export default Widget;
