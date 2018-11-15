import React, { Component } from 'react';
import woman from "./images/woman.svg";
import demon from "./images/demon.svg";

export default class Traveller extends Component {
	render() {
		const {color, id, handleTravellerClick, type } = this.props;

		return (
			<div onClick={handleTravellerClick} className={`h-10 w-10  flex justify-center items-center`} style={{cursor: 'pointer'}}>
				{	type === "priest" ?
					(<img src={woman}/>):
					(<img src={demon}/>)
				}
			</div>
		);
	}
}