import { Route, Routes } from 'react-router-dom';
import './App.css';
import AuthorizePage from './components/AutorizePage';
import Home from './components/Home/Home';
import Moduls from './components/Moduls/Module';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route index element={<AuthorizePage />} />
				<Route path={'home/*'} element={<Home />} />
			</Routes>
		</div>
	);
}

export default App;
