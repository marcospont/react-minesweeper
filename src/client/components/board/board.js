import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import GameStore from '../../stores/game-store';
import StatusBar from '../status-bar/status-bar';
import Row from '../row/row';

@inject('gameStore')
@observer
class Board extends React.Component {
	render() {
		const { gameStore } = this.props;

		return (
			<table className="board">
				<thead>
					<StatusBar />
				</thead>
				<tbody>
					{gameStore.board.map((row, i) => (
						<Row row={row} key={i} />
					))}
				</tbody>
			</table>
		);
	}
}

Board.propTypes = {
	board: PropTypes.object,
	gameStore: PropTypes.instanceOf(GameStore)
};

export default Board;
