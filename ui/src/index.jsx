import React from 'react';
import ReactDOM from 'react-dom';

const App = ({id}) => 
	<div id={id}>Hello!</div>;

ReactDOM.render(<App id="morse-app"/>,
	document.getElementById('app'));