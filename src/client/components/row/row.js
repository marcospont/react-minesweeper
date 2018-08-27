import React from 'react';
import PropTypes from 'prop-types';

import Square from '../square/square';

const Row = ({ row }) => (
	<tr className="row">
		{row.map((square, i) => (
			<Square key={i} {...square} />
		))}
	</tr>
);

Row.propTypes = {
	row: PropTypes.object
};

export default Row;
