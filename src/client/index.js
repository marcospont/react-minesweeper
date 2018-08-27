import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import stores from './stores';

import Game from './components/game';

ReactDOM.render(
	<div>
		<Provider {...stores}>
			<Game />
		</Provider>
		<DevTools />
	</div>,
	document.getElementById('root')
);
