import React, { Component } from 'react';
import cannibalSolver from './cannibalSolver';

export default class App extends Component {
	render() {
    	return (
    		<div>
    			Here is the tree of missionaries and cannibal
    			<pre>
    				{JSON.stringify(cannibalSolver, null, 4)}
    			</pre>
    		</div>
    	)
    }
}	