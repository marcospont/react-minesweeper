import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import stores from './stores';

import Game from './components/game';

ReactDOM.render(
	<div>
		<Provider {...stores}>
			<Game />
		</Provider>
	</div>,
	document.getElementById('root')
);
