import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
	return{
	type: actionTypes.AUTH_START
	}
}

export const authSuccess = (token, userId) => {
	return{
	type: actionTypes.AUTH_SUCCESS,
	payload: {
		token: token,
		userId: userId
	}
	}
}

export const authFail = (error) => {
	return{
		type: actionTypes.AUTH_FAIL,
		payload: {
			error: error
		}
	}
}

export const logout = () => {
	localStorage.removeItem('token')
	localStorage.removeItem('expirationDate')
	localStorage.removeItem('userId')
	return{
		type: actionTypes.AUTH_LOGOUT
	}
}

export const checkAuthTimeout = (expirationTime) => {
	return dispatch =>{
		setTimeout(() =>{
			dispatch(logout())
		}, expirationTime * 1000)
		
	}
}

export const auth = (email, password, isSignup) => {
	return dispatch => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true
		}
		let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCRXDqAtlzHJb8jRFpuqJSc6uAOSgBLmMA';
		if(!isSignup) {
			url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCRXDqAtlzHJb8jRFpuqJSc6uAOSgBLmMA'
		}
		axios.post(url, authData)
		.then(response =>{
			console.log(response);
			const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
			localStorage.setItem('token', response.data.idToken)
			localStorage.setItem('expirationDate', expirationDate )
			localStorage.setItem('userId', response.data.userId)
			dispatch(authSuccess(response.data.idToken, response.data.localId))
			dispatch(checkAuthTimeout(response.data.expiresIn))
		})
		.catch(error => {
			console.log(error);
			dispatch(authFail(error.response.data.error))
		})
	}
}
		

export const setAuthRedirectPath = (path) => {
	return{
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		payload: {
			path: path
		}
	}
}

