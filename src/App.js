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
        const state = {...this.state}
        let posToDelete,indexToDelete;
        if(position === "middle" && state.middle.length >= 2){
            alert('Already 2 members on boat');
            return;
        }

        for(let pos in state) {
            state[pos].forEach((traveller, travellerIndex)=>{
                if(traveller.id === id){
                    posToDelete = pos;
                    indexToDelete = travellerIndex
                }
            })
        }
        state[position].push(state[posToDelete][indexToDelete]);
        state[posToDelete].splice(indexToDelete,1);                 
        this.setState(state);
    }

    render() {
        return (
          <div className="h-screen container mx-auto flex">
          	<div className="bg-orange-light w-1/5">
                <ChangeToTraveller 
                className="h-full flex flex-col justify-around items-center"
                handleClick={this.handleClick} 
                toPosition="middle" 
                travellers={this.state.left}/>
          	</div>
    		
    		<div className="bg-blue w-3/5 flex flex-col justify-center">
                <Boat 
                    travellers={<ChangeToTraveller className="h-full flex  flex-row-reverse justify-around items-center" handleClick={this.handleClick} 
                    toPosition="right" 
                    travellers={this.state.middle}/>}
                />
    		</div>

    		<div className="bg-orange-light w-1/5">
                <ChangeToTraveller 
                    className="h-full flex flex-col justify-around items-center"
                    handleClick={this.handleClick} 
                    toPosition="middle" 
                    travellers={this.state.right}/>
    		</div>
          </div>
        );
    }
}
