import React, { Component } from 'react';

export default class Boat extends Component {
	render() {
		return (
			<div className="bg-orange-darkest h-16 max-w-xs p-2">
					{this.props.travellers}
			</div>
		);
	}
}	