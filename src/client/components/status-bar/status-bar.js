import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import GameStore from '../../stores/game-store';

const smileyFace = require('../../assets/images/smiley-face.png');

@inject('gameStore')
@observer
class StatusBar extends React.Component {
	reset = () => {
		const { gameStore } = this.props;

		gameStore.newGame();
	};

	render() {
		const { gameStore } = this.props;

		return (
			<tr>
				<td className="status-bar" colSpan={gameStore.settings.cols}>
					<div className="inner">
						<div className="digital-box">{String(gameStore.state.minesLeft).padStart(3, '0')}</div>
						<div className="reset" onClick={this.reset}>
							<img src={smileyFace} border="0" />
						</div>
						<div className="digital-box">{String(gameStore.state.timer).padStart(3, '0')}</div>
					</div>
				</td>
			</tr>
		);
	}
}

StatusBar.propTypes = {
	gameStore: PropTypes.instanceOf(GameStore)
};

export default StatusBar;
