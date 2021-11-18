import React from 'react';
import "./index.css";
// import $ from "jquery";

import Gear from "../Gear";
import { restdb } from '../../App';

class GearsHeader extends React.Component{
	constructor(props){
		super(props);
		this.handleSearchGearsChange = this.handleSearchGearsChange.bind(this);
	}

	handleSearchGearsChange(e){
		this.props.handleSearchGearsChange(e.target.value);
	}

	render(){
		const search = this.props.search;

		return(
			<form className="gearsHeader">
				<input 
					type="text"
					id="searchGears"
					name="searchGears"
					placeholder="Recherche ..."
					onChange={this.handleSearchGearsChange}
					value={search}
				/>
			</form>
		);
	}
}

export default class Gears extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			searchGears: "",
			gears: [],
			error: null,
      		isLoaded: false,
		};

		this.handleSearchGearsChange = this.handleSearchGearsChange.bind(this);
		this.handleGearClick = this.handleGearClick.bind(this);
	}

	componentDidMount(){
		restdb.get("/rest/gears").then(res => {
			this.setState({
				isLoaded: true,
				gears: res.data
			});
		});
	}

	handleSearchGearsChange(value){
		this.setState({
			searchGears: value
		});
	}

	handleGearClick(id, amount){
		restdb.post("/rest/farm",
			{id: id, amount: amount, acquire: 0}
		).catch(function(error){
			console.log(error);
		})
	}

	render(){
		const {error, isLoaded} = this.state;
		let {gears, searchGears} = this.state;

		if(error)
			return <div>Erreur : {error.message}</div>;
		else if(!isLoaded)
			return <div>Chargement…</div>;
		else{
			// if(ids.length)
			// 	gears = gears.filter(g => ids.includes(g.base_id));

			if(searchGears && searchGears.length)
				gears = gears.filter(g => g.name.toLowerCase().includes(searchGears.toLowerCase()));

			const listGears = [];
			gears.forEach(g => {
				listGears.push(
					<Gear
						key={g._id}
						gear={g}
						handleGearClick={this.handleGearClick}
					/>);
			});
		
			return(
				<>
					<GearsHeader
						searchGears={searchGears}
						handleSearchGearsChange={this.handleSearchGearsChange}
					/>
					<div className="gears">
						{listGears}
					</div>
				</>
				
			);
		}
	}
}