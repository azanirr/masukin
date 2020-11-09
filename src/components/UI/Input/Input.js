import React from 'react';

import classes from './Input.css';

const input = (props) => {
	
	let inputElements = null;
	const inputClasses = [classes.InputElements];
	
	if(props.invalid && props.shouldValidate && props.touched){
		inputClasses.push(classes.Invalid)
	}
	
	switch (props.elementType) {
			case('input'):
				inputElements = 
					<input 
						className={inputClasses.join(' ')}
						{...props.elementConfig} 
						value={props.value}
						onChange={props.changed}/>;
			break;
			case('textarea'):
				inputElements = 
					<textarea 
						className={inputClasses.join(' ')}
						{...props.elementConfig} 
						value={props.value}
						onChange={props.changed}/>;
			break;
			case('select'):
			inputElements =( 
					<select 
						className={inputClasses.join(' ')} 
						value={props.value}
						onChange={props.changed}>
						{props.elementConfig.options.map(option => (
							<option 
								key={option.value}
								value={option.value}>
								{option.displayValue}
							</option>	
					))}>	
				</select>);
			break;
			default:
				inputElements = <input 
									className={inputClasses.join(' ')} 
									{...props.elementConfig} 
									value={props.value}
									onChange={props.changed}/>;
	}
	
	return (
		<div className={classes.Input}>
			<label className={classes.Label}>{props.label}</label>
			{inputElements}
		</div>
	
	)
}

export default input;