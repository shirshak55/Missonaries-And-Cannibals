import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import MC from "./MC";
import Tree from "./Tree";


export default class App extends Component {
    render() {
    	return (
	    		<BrowserRouter>
                    <div>
    	    			<Route path="/mc" component={MC} />
    	    			<Route path="/tree" component={Tree} />
                    </div>
	    		</BrowserRouter>
    	)
    }
}
