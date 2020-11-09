import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderId: id,
		orderData: orderData
	}
}

export const purchaseBurgerFail = (error) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		error:error
	}
}

export const purchaseBurgerStart = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_START
	}
}

export const purchaseBurger = (orderData, token) => {
	return dispatch => {
		dispatch(purchaseBurgerStart());
		
		axios.post('/orders.json?auth=' + token, orderData)
			.then(response => {
				  dispatch(purchaseBurgerSuccess(response.data.name, orderData))
			})
			.catch(err => {
				  dispatch(purchaseBurgerFail(err))		
			});
	}
}

export const purchaseInit = () => {
	return{
		type: actionTypes.PURCHASE_INIT
	}
}

export const fetchOrderSuccess = (orders) => {
	return{
		type: actionTypes.FETCH_ORDER_SUCCESS,
		orders:orders
	}
}

export const fetchOrderFail = (error) => {
	return{
		type: actionTypes.FETCH_ORDER_FAIL,
		error: error
	}
}

export const fetchOrderStart = () => {
	return{
		type: actionTypes.FETCH_ORDER_START,
	}
}

export const fetchedOrder = (token, userId) => {
	return dispatch => {
		dispatch(fetchOrderStart());
		const query = '?auth=' + token + '&orderBy="userId"equalTo="' + userId + '"'
			axios.get('/orders.json?auth=' + token)
			.then(res => {
				const fetchedOrder = [];
				for (let key in res.data) {
					fetchedOrder.push({
						...res.data[key],
						id: key
					});
				}
				dispatch(fetchOrderSuccess(fetchedOrder)) 
		})
			.catch(err => {
				dispatch(fetchOrderFail(err))
		})
	}
}