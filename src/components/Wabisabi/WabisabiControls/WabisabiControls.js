import React from 'react';

import classes from './WabisabiControls.css';
import WabisabiControl from './WabisabiControl/WabisabiControl';

const controls = [
	{label: 'Salad', type: 'salad'},
	{label: 'Bacon', type: 'bacon'},
	{label: 'Cheese', type: 'cheese'},
	{label: 'Meat', type: 'meat'},
];

const wabisabiControls = (props) => {
	return(
	<div className={classes.WabisabiControls}>
			<p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
		{controls.map(ctrl => (
			<WabisabiControl 
				key={ctrl.label} 
				label={ctrl.label} 
				added={() => props.ingredientsAdded(ctrl.type)}
				remove={() => props.ingredientsRemove(ctrl.type)}
				disabled={props.disabled[ctrl.type]}/>
		)) };
			<button 
				className={classes.OrderButton}
				disabled={!props.purchasable}
				onClick={props.ordered}>{props.isAuthenticated ? 'ORDER NOW!' : 'SIGN IN TO ORDER'}</button>
	</div>
	)
}

export default wabisabiControls;