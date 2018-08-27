import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { inject, observer } from 'mobx-react';

import GameStore from '../../stores/game-store';

const flag = require('../../assets/images/flag.png');
const bomb = require('../../assets/images/bomb.png');
const wrongBomb = require('../../assets/images/wrong-bomb.png');

@inject('gameStore')
@observer
class Square extends React.Component {
	colors = ['#0000FA', '#4B802D', '#DB1300', '#202081', '#690400', '#457A7A', '#1B1B1B', '#7A7A7A'];

	handleClick = e => {
		const { gameStore, row, col } = this.props;

		if (e.shiftKey) {
			gameStore.flagSquare(row, col);
		} else {
			gameStore.clickSquare(row, col);
		}
	};

	render() {
		const { gameStore, row, col, revealed, flagged, mines, mine } = this.props;

		return (
			<td
				className={classNames({ square: true, revealed: revealed, flagged: flagged && !revealed })}
				style={{ color: this.colors[mines - 1] }}
				onClick={this.handleClick}
			>
				{flagged && (!revealed || mine) && <img src={flag} border="0" />}
				{flagged && revealed && !mine && <img src={wrongBomb} border="0" />}
				{!flagged && revealed && !mine && mines !== 0 && String(mines)}
				{!flagged && revealed && mine && <img src={bomb} border="0" />}
			</td>
		);
	}
}

Square.propTypes = {
	row: PropTypes.number,
	col: PropTypes.number,
	revealed: PropTypes.bool,
	value: PropTypes.number,
	mine: PropTypes.bool,
	gameStore: PropTypes.instanceOf(GameStore)
};

export default Square;
