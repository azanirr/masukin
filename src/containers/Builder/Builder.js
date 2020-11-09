import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Wabisabi from '../../components/Wabisabi/Wabisabi';
import WabisabiControls from '../../components/Wabisabi/WabisabiControls/WabisabiControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Wabisabi/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as builderAction from '../../store/action/index';


class Builder extends Component {
	
	
	state = {
		purchasing: false,
	}

		
	componentDidMount () {
		console.log(this.props);
		this.props.onInitIngredients();
	}

	updatePurchaseState (ingredients) {
		
		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		return sum > 0
	}

 	 
	purchaseHandler = () => {
		if(this.props.isAuthenticated){
			this.setState({purchasing: true});
		} else{
			this.props.onSetAuthRedirectPath('/checkout')
			this.props.history.push('/auth')
		}
		
	}
	
	purchaseCancelHandler = () => {
		this.setState({purchasing: false});
	}

	
	purchaseContinueHandler = () => {
		this.props.onInitPurchase();
		this.props.history.push('/checkout')
	}


	render () {
		
		
		const disabledInfo = {
			...this.props.ings
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}
		let orderSummary = null;
			
		let wabisabi = this.props.error ? <p>Can't be loaded</p> : <Spinner />
		
		if(this.props.ings) {
			wabisabi= (
				<Aux>
					<Wabisabi ingredients={this.props.ings}/>
					<WabisabiControls 
					ingredientsAdded={this.props.onIngredientsAdded}
					ingredientsRemove={this.props.onIngredientsRemoved}
					purchasable={this.updatePurchaseState(this.props.ings)}
					disabled={disabledInfo}
					isAuthenticated={this.props.isAuthenticated}
					ordered={this.purchaseHandler}
					price={this.props.price} />
				</Aux>
				)	
			orderSummary = <OrderSummary 
						ingredients={this.props.ings}
						purchaseCancelled={this.purchaseCancelHandler}
						purchaseContinued={this.purchaseContinueHandler}
						price={this.props.price}/>
		}
				
		return (
			<Aux>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
					{wabisabi}
			</Aux>
		);
	}
}

const mapStateToProps = state => {
	return{
		ings: state.builder.ingredients,
		price: state.builder.totalPrice,
		error: state.builder.error,
		isAuthenticated: state.auth.token !== null
	}
}

const mapDispatchToProps = dispatch => {
	return{
		onIngredientsAdded: (ingName) => dispatch(builderAction.addIngredient(ingName)),
		onIngredientsRemoved: (ingName) => dispatch(builderAction.removeIngredient(ingName)),
		onInitIngredients: () => dispatch(builderAction.initIngredients()),
		onInitPurchase: () => dispatch(builderAction.purchaseInit()),
		onSetAuthRedirectPath: (path) => dispatch(builderAction.setAuthRedirectPath(path)) 
	}
}



export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Builder, axios));