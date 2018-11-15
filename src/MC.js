import React, { Component } from 'react';
import Traveller from "./Traveller";
import Boat from "./Boat"

class ChangeToTraveller extends Component {
    render() {
        const props = this.props;
        const {travellers, className, toPosition} = this.props;

        return (
            <div className={className}>
                {travellers.map( 
                    (traveller) => {
                        const {id} = traveller;
                        return (<Traveller 
                        handleTravellerClick={(e) => props.handleTravellerClick(e, id, toPosition)} 
                        {...traveller} 
                        key={id} 
                        />)
                    }
                )}
            </div>
        );
    }
}

export default class MC extends Component {
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

    filterPriest(position) {
        return this.state.traveller[position].filter((traveller) => {
            return traveller.type === "priest";
        });
    }

    filterDemon(position) {
        return this.state.traveller[position].filter((traveller) => {
            return traveller.type === "demon";
        });
    }

    componentDidUpdate(props,prevState){
        const leftPriestCount = this.filterPriest('left').length;
        const rightPriestCount = this.filterPriest('right').length;

        const leftDemonCount = this.filterDemon('left').length;
        const rightDemonCount = this.filterDemon('right').length;

        const boatPriestCount = this.filterPriest('middle').length;
        const boatDemonCount = this.filterDemon('middle').length;

        const boatLeftPriestCount = this.state.boat.position === "left" ? boatPriestCount : 0;
        const boatRightPriestCount = this.state.boat.position === "right" ? boatPriestCount : 0;
        const boatLeftDemonCount = this.state.boat.position === "left" ? boatDemonCount : 0;
        const boatRightDemonCount = this.state.boat.position === "right" ? boatDemonCount : 0;

        // ! Left + Boat Left Priest > Demon
        console.log(
            "LD", leftDemonCount + boatLeftDemonCount , "LP", leftPriestCount + boatLeftPriestCount, "RD", rightDemonCount + boatRightDemonCount , "RD", rightPriestCount + boatRightPriestCount 
        );

        const totalLeftPristCount = leftPriestCount + boatLeftPriestCount;
        const totalLeftDemonCount = leftDemonCount + boatLeftDemonCount;
        const totalRightDemonCount = rightDemonCount + boatRightDemonCount ;
        const totalRightPriestCount =  rightPriestCount + boatRightPriestCount;


        if(
            (totalLeftPristCount !== 0 &&  totalLeftDemonCount> totalLeftPristCount ) ||
            (totalRightPriestCount !==0 && totalRightDemonCount > totalRightPriestCount )
        ){
            alert("You lost the game. Try again?")
            this.setState(prevState);
        }

        if(totalRightPriestCount === 3 && totalRightDemonCount===3){
            alert("You won.")
        }
        // ! Right + Right Boat > Demon
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

    handleTravellerClick(event, id, position) {
        event.stopPropagation();
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

        if(this.state.traveller.middle.length === 0){
            alert("There is no travller on boat");
            return;
        }

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
          <div className="h-screen flex">
          	<div className="bg-orange-light w-1/5">
                <ChangeToTraveller 
                className="h-full flex flex-col justify-around items-center"
                handleTravellerClick={this.handleTravellerClick} 
                toPosition="middle" 
                travellers={this.state.traveller.left}/>
          	</div>
    		
    		<div className={`bg-blue w-3/5 relative flex items-center`}>
                <Boat 
                    clickHandler={this.handleBoatClick}
                    position={this.state.boat.position}
                    travellers={<ChangeToTraveller toPosition={this.state.boat.position}  travellers={this.state.traveller.middle} className="h-full flex  flex-row-reverse justify-around items-center" handleTravellerClick={this.handleTravellerClick}  
                    />}
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
