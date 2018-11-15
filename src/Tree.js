import React, { Component } from 'react';
import cannibalSolver from './cannibalSolver';

const tree = cannibalSolver.tree;

function Node(props){
    return (
        <ul>
            {props.value.map((val,index) => {
                return <li key={index}>
                        M {val.state.left.missionary} C {val.state.left.cannibal} {val.state.boat} M {val.state.right.missionary} {val.state.left.cannibal}
                        {val.children != null && <Node value={val.children} />}
                   </li>
            })}
        </ul>
    )
}

export default class App extends Component {
	render() {
    	return (
    		<div>
                <pre>
                    {JSON.stringify(tree, null, 4)}
                </pre>
    		</div>
    	)
    }
}	