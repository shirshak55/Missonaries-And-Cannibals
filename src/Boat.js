import React, { Component } from 'react';

export default class Boat extends Component {
	render() {
		const {clickHandler} = this.props;

		return (
			<div onClick={clickHandler} className="bg-orange-darkest h-16 max-w-xs p-2">
					{this.props.travellers}
			</div>
		);
	}
}	