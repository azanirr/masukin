import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'; 
import * as actions from '../../../store/action/index';

import classes from './ContactData.css';

class ContactData extends Component {
	state= {
		orderForm: {
				name: {
					elementType: 'input',
					elementConfig:{
						type: 'text',
						placeholder: 'Your Name'
					},
					value: '',
					validation: {
						required: true,
					},
					valid: false,
					touched: false,
				},
				street: {
					elementType: 'input',
					elementConfig:{
						type: 'text',
						placeholder: 'Address'
					},
					value: '',
					validation: {
						required: true
					},
					valid: false,
					touched: false,
				},
				postalCode: {
					elementType: 'input',
					elementConfig:{
						type: 'text',
						placeholder: 'Postal Code'
					},
					value: '',
              		validation: {
                    	required: true,
                	    minLength: 5,
                },
                valid: false,
                touched: false
            },
				email: {
					elementType: 'input',
					elementConfig:{
						type: 'email',
						placeholder: 'Your Email'
					},
					value: '',
					validation: {
						required: true,
						minLength: 5,
					},
					valid: false,
					touched: false,
				},
				deliver: {
					elementType: 'select',
					elementConfig:{
						options: [
							{value: 'fastest', displayValue: 'Fastest'},
							{value: 'cheapest', displayValue: 'Cheapest'}
						]
					},
					value: '',
					validation: {},
					valid: false,
					touched: false,
		},
	},
		formIsValid: false,
	}

	orderHandler = (event) => {
		event.preventDefault()
		this.setState({loading: true});
		const formData = {};
		for (let formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
		}
		const order = {
			ingredients: this.props.ings,
			price: this.props.price,
			orderData: formData,
			userId: this.props.userId
		}
		this.props.onOrderBurger(this.props.token);
		
	}

	checkValidity (value, rules) {
		let isValid = true;
		
		if(!rules){
			return true;
		}
		
		if(rules.required){
			isValid = value.trim() !== '' && isValid;
		}
		if(rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}
		return isValid;
	}

	
	inputChangedHandler = (event, inputIdentifier) => {
		 const updatedOrderForm = {
			 ...this.state.orderForm
		 } 
		 const updatedFormElement= {
			...updatedOrderForm[inputIdentifier]
		 }
		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
		updatedFormElement.touched = true;
		updatedOrderForm[inputIdentifier] = updatedFormElement;
		
		 let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
		this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
		 }
	

	render () {
		const formElement = [];
		for (let key in this.state.orderForm) {
			formElement.push({
				id: key,
				config:this.state.orderForm[key]
			})
		}
		
		
		let form =(
				<form onSubmit={this.orderHandler}>
						{formElement.map(formElement => (
							<Input
								key={formElement.id}
								elementType={formElement.config.elementType}
								elementConfig={formElement.config.elementConfig}
								value={formElement.config.value}
								invalid={!formElement.config.valid}
								touched={formElement.config.touched}
								shouldValidate={formElement.config.validation}
								changed={(event) => this.inputChangedHandler(event, formElement.id)} />
						))}
					<Button 
						btnType="Success"
						disabled={!this.state.formIsValid}
						>ORDER</Button>
				</form>
		);
		if (this.props.loading){
			form = <Spinner />
		}
		return(
		
			<div className={classes.ContactData}>
				<h4>Enter Your Contact Data</h4>
				{form}
			</div>
			
		)
	}
}

const mapStateToProps = state => {
	return{
		ings: state.builder.ingredients,
		price: state.builder.totalPrice,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios)) ;