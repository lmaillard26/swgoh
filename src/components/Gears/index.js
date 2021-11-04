import React from 'react';
import "./index.css";
import $ from "jquery";

import Gear from "../Gear";

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
			farmList: [],
			error: null,
      		isLoaded: false,
		};

		this.handleSearchGearsChange = this.handleSearchGearsChange.bind(this);
		this.handleGearClick = this.handleGearClick.bind(this);
	}

	componentDidMount() {
		$.get("https://swgoh-08e2.restdb.io/rest/gears?apikey=6ca7bcb63f2e55be8e37e984290c8bb7653ce", (data) => {
			this.setState({
				isLoaded: true,
				gears: data
			});
		});
		// fetch("https://swgoh-08e2.restdb.io/rest/gears")
		//   	.then(res => res.json())
		//   	.then((result) => {
		// 		this.setState({
		// 			isLoaded: true,
		// 			gears: result
		// 		});
		// 	},
		// 	(error) => {
		// 		this.setState({
		// 			isLoaded: true,
		// 			error
		// 		});
		// 	}
		// )
	  }

	handleSearchGearsChange(value){
		this.setState({
			searchGears: value
		});
	}

	handleGearClick(id){

	}

	render(){
		const {error, isLoaded} = this.state;
		let {gears, searchGears} = this.state;
		let {ids, header} = this.props;

		if (error)
			return <div>Erreur : {error.message}</div>;
		else if (!isLoaded)
			return <div>Chargement…</div>;
		else{
			if(ids)
				gears = ids.length ? gears.filter(g => ids.includes(g.base_id)) : [];

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
					{header && <GearsHeader
						searchGears={searchGears}
						handleSearchGearsChange={this.handleSearchGearsChange}
					/>}
					<div className="gears">
						{listGears}
					</div>
				</>
				
			);
		}
	}
}