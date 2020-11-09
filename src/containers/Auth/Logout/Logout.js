import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../../store/action/index';

class Logout extends Component {
	
	componentDidMount (){
		this.props.logout(this.props)
	}
	
	render() {
		return <Redirect to="/" />
	}
}

const mapDispatchToProps = dispatch => {
	return{
		logout: () => dispatch(actions.logout())
	}	
}

export default connect(null, mapDispatchToProps)(Logout);