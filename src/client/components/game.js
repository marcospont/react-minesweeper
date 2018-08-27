import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import GameStore from '../stores/game-store';
import Board from './board/board';

import './game.scss';

@inject('gameStore')
@observer
class Game extends React.Component {
	componentWillMount() {
		const { gameStore } = this.props;

		gameStore.newGame();
	}

	render() {
		return (
			<div className="game">
				<Board />
			</div>
		);
	}
}

Game.propTypes = {
	gameStore: PropTypes.instanceOf(GameStore)
};

export default Game;
