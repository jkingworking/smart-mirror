import React from 'react';
import PropTypes from 'prop-types';

function Widget ({className, children}) {
	return (
		<div className={`component-widget ${className}`}>
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
