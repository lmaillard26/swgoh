import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Gears from "./components/Gears";

let farmList = [];

function addToFarmList(id){
	farmList.push(id);
	// this.setState({
	// 	farmList: farmList
	// });
}

ReactDOM.render(
  	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route path="gears" element={
						<Gears
							header={true}
							addToFarmList={addToFarmList}
						/>
					} />
					<Route path="farmList" element={
						<Gears
							header={false}
							addToFarmList={addToFarmList}
							ids={farmList}
						/>
					} />
				</Route>
			</Routes>
		</BrowserRouter>
  	</React.StrictMode>,
  	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
