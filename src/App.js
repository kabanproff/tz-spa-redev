import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthorizePage from './components/AutorizePage';
import Home from './components/Home/Home';
import { useAuth } from './hooks/useAuth';
// import Moduls from './components/Moduls/Module';


function App() {
	const { isAuth } = useAuth()
	console.log("isAuth", isAuth)
	return (
		<div className="App">
			<Routes>

				<Route path={'/*'} element={!isAuth ? <Navigate to={'/authorization'} replace /> : <Home />} />
				<Route path={'/authorization'} element={<AuthorizePage />} />


				{/* <Route path={'/*'} element={<Home />} /> */}
				{/* <Route path={'/authorization'} element={<AuthorizePage />} /> */}
			</Routes>
		</div>
	);
}

export default App;
