import React from 'react';
import './App.css';

import {Outlet, Link} from "react-router-dom";
import axios from 'axios';

const apikey = "6ca7bcb63f2e55be8e37e984290c8bb7653ce";
let restdb = axios.create({
	baseURL: "https://swgoh-08e2.restdb.io",
	headers: {"x-apikey": apikey}	
})
export{apikey, restdb}

class App extends React.Component{
	render(){
		return(
			<div className="App">
				<nav className="header">
					<ul>
						<li><Link to="/">Home</Link></li>
						<li><Link to="/farmList">Farm List</Link></li>
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
