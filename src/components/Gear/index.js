import React from 'react';
import "./index.css";

import Container from "../Popup/Container";

class Gear extends React.Component{
	constructor(props){
		super(props);
		this.handleGearClick = this.handleGearClick.bind(this);
	}

	handleGearClick(e){
		e.preventDefault();
		this.props.handleGearClick(this.props.gear.base_id, e.target.amount.value);
	}

	render(){
		const gear = this.props.gear;
        const triggerText = "+";

		if(gear.name){
			return(
				<div className="gear">
					<img src={gear.image} alt="" />
					<span>{gear.name}</span>
					<Container triggerText={triggerText} onSubmit={this.handleGearClick} />
				</div>
			);
		}
		return false;
	}
}

export default Gear;