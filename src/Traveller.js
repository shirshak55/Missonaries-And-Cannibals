import React, { Component } from 'react';

export default class Traveller extends Component {
	render() {
		const {color, id, handleTravellerClick }= this.props;

		return (
			<div onClick={handleTravellerClick} className={`h-10 w-10 bg-${color} flex justify-center items-center`} style={{cursor: 'pointer'}}>
				{id}
			</div>
		);
	}
}