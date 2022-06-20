import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'

import App from './App';

import './index.less';
import { store } from './redux/store';

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
	<Router>
		<React.StrictMode>
			<Provider store={store} >
				<App />
			</Provider>
		</React.StrictMode>
	</Router>
);

