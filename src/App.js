import React, { Component } from 'react';
import Traveller from "./Traveller";
import Boat from "./Boat"

class ChangeToTraveller extends Component {
    render() {
        const props = this.props;
        const {className} = this.props;

        return (
            <div className={className}>
                { props.travellers.map( (traveller) => <Traveller handleTravellerClick={() => props.handleTravellerClick(traveller.id, props.toPosition)} {...traveller} key={traveller.id} />) }
            </div>
        );
    }
}

export default class App extends Component {
    constructor() {
        super();

        this.state = {
            traveller: {
                left: [
                    this.generatePriest(1),
                    this.generatePriest(2),
                    this.generatePriest(3),
                    this.generateDemon(4),
                    this.generateDemon(5),
                    this.generateDemon(6),
                ],
                middle: [],
                right: []
            },
            boat: {
                position: "left",
            }
        }

        this.handleTravellerClick = this.handleTravellerClick.bind(this);
        this.handleBoatClick = this.handleBoatClick.bind(this);
    }

    generateTraveller(type){
        return ({type: type});
    }

    generatePriest(id) {
        const traveller = this.generateTraveller('priest');
        traveller.id = id;
        traveller.color = 'green';
        return traveller;
    }

    generateDemon(id) {
         const traveller = this.generateTraveller('demon');
        traveller.id = id;
        traveller.color = 'red';
        return traveller;
    }

    handleTravellerClick(id, position) {
        const travellerState = {...this.state.traveller}
        let posToDelete,indexToDelete;

        if(position === "middle" && travellerState.middle.length >= 2){
            alert('Already 2 members on boat');
            return;
        }

        for(let pos in travellerState) {
            travellerState[pos].forEach((traveller, travellerIndex)=>{
                if(traveller.id === id){
                    posToDelete = pos;
                    indexToDelete = travellerIndex
                }
            })
        }
        travellerState[position].push(travellerState[posToDelete][indexToDelete]);
        travellerState[posToDelete].splice(indexToDelete,1);                 
        this.setState({travellerState});
    }

    handleBoatClick() {
        const boatState = {...this.state.boatState}
        const initialPosition = this.state.boat.position;

        let newPosition;

        if(initialPosition === "left") {
            newPosition = 'right';
        }else{
            newPosition = 'left'
        }

        boatState.position = newPosition;

        this.setState({boat: boatState})
    }

    render() {
        return (
          <div className="h-screen container mx-auto flex">
          	<div className="bg-orange-light w-1/5">
                <ChangeToTraveller 
                className="h-full flex flex-col justify-around items-center"
                handleTravellerClick={this.handleTravellerClick} 
                toPosition="middle" 
                travellers={this.state.traveller.left}/>
          	</div>
    		
    		<div className="bg-blue w-3/5 flex flex-col justify-center ">
                <Boat 
                    clickHandler={this.handleBoatClick}
                    travellers={<ChangeToTraveller handleTravellerClick={this.handleTravellerClick}  className="h-full flex  flex-row-reverse justify-around items-center" 
                    toPosition={this.state.boat.position === "left"? "left": "right"} 
                    travellers={this.state.traveller.middle}/>}
                />
    		</div>

    		<div className="bg-orange-light w-1/5">
                <ChangeToTraveller 
                    className="h-full flex flex-col justify-around items-center"
                    handleTravellerClick={this.handleTravellerClick} 
                    toPosition="middle" 
                    travellers={this.state.traveller.right}/>
    		</div>
          </div>
        );
    }
}
