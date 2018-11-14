import React, { Component } from 'react';

export default class Traveller extends Component {
	render() {
		const {color, id, handleClick }= this.props;

		return (
			<div onClick={handleClick} className={`h-10 w-10 bg-${color} flex justify-center items-center`} style={{cursor: 'pointer'}}>
				{id}
			</div>
		);
	}
}