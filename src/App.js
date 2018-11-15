import React, { Component } from 'react';
import Traveller from "./Traveller";
import Boat from "./Boat"

class ChangeToTraveller extends Component {
    render() {
        const props = this.props;
        const {className} = this.props;

        return (
            <div className={className}>
                { props.travellers.map( (traveller) => <Traveller handleClick={() => props.handleClick(traveller.id, props.toPosition)} {...traveller} key={traveller.id} />) }
            </div>
        );
    }
}

export default class App extends Component {
    constructor() {
        super();


        this.state = {
            travller: {
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

        this.handleClick = this.handleClick.bind(this);
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

    handleClick(id, position) {
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

    render() {
        return (
          <div className="h-screen container mx-auto flex">
          	<div className="bg-orange-light w-1/5">
                <ChangeToTraveller 
                className="h-full flex flex-col justify-around items-center"
                handleClick={this.handleClick} 
                toPosition="middle" 
                travellers={this.state.travellerState.left}/>
          	</div>
    		
    		<div className="bg-blue w-3/5 flex flex-col justify-center">
                <Boat 
                    travellers={<ChangeToTraveller className="h-full flex  flex-row-reverse justify-around items-center" handleClick={this.handleClick} 
                    toPosition="right" 
                    travellers={this.state.travellerState.middle}/>}
                />
    		</div>

    		<div className="bg-orange-light w-1/5">
                <ChangeToTraveller 
                    className="h-full flex flex-col justify-around items-center"
                    handleClick={this.handleClick} 
                    toPosition="middle" 
                    travellers={this.state.travellerState.right}/>
    		</div>
          </div>
        );
    }
}
