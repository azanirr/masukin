import React from 'react';

import classes from './Wabisabi.css';
import WabisabiIngredients from './WabisabiIngredients/WabisabiIngredients';

const wabisabi = (props) => {
	let transformedIngredients = Object.keys(props.ingredients)
		.map(igKey => {
			return [...Array(props.ingredients[igKey])].map((_, i) => {
				return <WabisabiIngredients key={igKey + 1} type={igKey} />
			}); 
		})
		.reduce((arr, el) => {
			return arr.concat(el)
		}, []);
	if (transformedIngredients.length === 0) {
		transformedIngredients = <p>Please start adding ingredients!</p>
	}
	return(
		<div className={classes.Burger}>
			<WabisabiIngredients type="bread-top" />
			{transformedIngredients}
			<WabisabiIngredients type="bread-bottom" />
		</div>
	);
	
};

export default wabisabi;