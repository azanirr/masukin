import React from 'react';

import Wabisabi from '../../Wabisabi/Wabisabi';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
	return (
		<div className={classes.CheckoutSummary}>
			<h1>We hope it taste well!</h1>
			<div style={{width: '100%', margin: 'auto'}}>
				<Wabisabi 
					ingredients={props.ingredients}/>
			</div>
			<Button 
				btnType="Danger"
				clicked={props.checkoutCancelled}
				>Cancel</Button>
			<Button 
				btnType="Success"
				clicked={props.checkoutContinued}>Continue</Button>
			
		</div>
	)
}

export default checkoutSummary;