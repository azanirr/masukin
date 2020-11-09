import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './Auth.css';

import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import * as actions from '../../store/action/index';

class Auth extends Component {
	state ={
		controls: {
			email: {
					elementType: 'input',
					elementConfig:{
						type: 'email',
						placeholder: 'Your Email'
					},
					value: '',
					validation: {
						required: true,
						isEmail: true
					},
					valid: false,
					touched: false,
				},
			password: {
					elementType: 'input',
					elementConfig:{
						type: 'password',
						placeholder: 'Your Password'
					},
					value: '',
					validation: {
						required: true,
						minLength: 6
					},
					valid: false,
					touched: false,
				},
			
		},
		isSignup: true
	}

	componentDidMount () {
		if(!this.props.building && this.props.authRedirect !== '/'){
			this.onSetAuthRedirectPath()
		}
	}

	checkValidity (value, rules) {
		let isValid = true;
		if(!rules) {
			return true;
		}
		if(rules.required) {
			isValid = value.trim() !== '' && isValid
		}
		if(rules.minLength) {
			isValid = value.length <= rules.minLength && isValid
		}
		return isValid;
	}

	inputChangedHandler = (event, controlName) => {
		const updatedControls = {
			...this.state.controls,
			[controlName]: {
				...this.state.controls[controlName],
				value: event.target.value,
				valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
				touched: true
		}	
		}
		this.setState({controls: updatedControls})
	}
	
	submitHandler = (event) => {
		event.preventDefault();
		this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
	}
	
	switchAuthModeHandler = () => {
		this.setState(prevState => {
			return{
				isSignup: !prevState.isSignup
			}
		})
	}
	
	render(){
		const formElement = [];
		for (let key in this.state.controls) {
			formElement.push({
				id: key,
				config: this.state.controls[key]
			})
		}
		
		const form = formElement.map(formElements => (
			<Input 
				key={formElements.id}
				elementType={formElements.config.elementType}
				elementConfig={formElements.config.elementConfig}
				value={formElements.config.value}
				invalid={!formElements.config.valid}		
				touched={formElements.config.touched}
				shouldValidate={formElements.config.validation}
				changed={(event) => this.inputChangedHandler(event, formElements.id)}
				/>
				
		))
	

		let errorMessage = null;

		if(this.props.error) {
			errorMessage = (
		<p>{this.props.error.message}</p>
			)
		}
		
		let redirect = null
		if(this.props.isAuthenticated){
			redirect = <Redirect to={this.props.authRedirect()} />
		}
		
		return(
			<div className={classes.Auth}>
				{redirect}
				{errorMessage}
				<form onSubmit={this.submitHandler}>
					{form}
					<Button btnType="Success">Submit</Button>
				</form>
				<Button 
					clicked={this.switchAuthModeHandler}
					btnType="Danger">Switch To {this.state.isSignup ? 'Sign In' : 'Sign Up'}</Button>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return{
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthenticated: state.auth.token !== null,
		building: state.builder.building,
		authRedirect: state.auth.authRedirectPath
	}
}


const mapDispatchToProps = dispatch => {
	return {
		onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
		onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);