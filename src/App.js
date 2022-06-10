import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthorizePage from './components/AutorizePage';
import Home from './components/Home/Home';
import { useNavigate } from 'react-router-dom'

import { useAuth } from './hooks/useAuth';



function App() {
	const { isAuth } = useAuth()
	const navigate = useNavigate()

	React.useEffect(
		() => {
			if (isAuth) navigate('/')
		}, [isAuth])


	return (
		<div className={"App"}>
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
