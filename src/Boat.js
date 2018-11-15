import React, { Component } from 'react';

export default class Boat extends Component {
	render() {
		const {clickHandler, position} = this.props;

		return (
			<div onClick={clickHandler} className={`boat bg-orange-darkest p-2 absolute smooth-transition ${position === 'left' ? 'boat-left' : 'boat-right' }`}>
				{this.props.travellers}
			</div>
		);
	}
}	