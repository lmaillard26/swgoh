import React from 'react';
import './App.css';

import {Outlet, Link} from "react-router-dom";

class App extends React.Component{
	render(){
		return(
			<div className="App">
				<nav className="header">
					<ul>
						<li><Link to="/">Home</Link></li>
						{/* <li><Link to="/farmList">Farm List</Link></li> */}
						{/* <li><Link to="/characters">Characters</Link></li> */}
						<li><Link to="/gears">Gears</Link></li>
					</ul>
				</nav>
				<Outlet />
			</div>
		);
	}
}

export default App;
