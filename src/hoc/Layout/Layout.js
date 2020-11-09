import React, { Component } from 'react';
import { connect } from 'react-redux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Aux from '../Aux/Aux';
import classes from './Layout.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
	state ={
		showSideDrawer: false
	}
	
	sideDrawerCloseHandler = () => {
		this.setState({showSideDrawer: false});
	}
	 
	sideDrawerToggleHandler = () => {
		this.setState((prevState) => {
			 return {showSideDrawer: !prevState.showSideDrawer};
		})
	}
	
	render() {
		return (
			<Aux>
				<Toolbar 
					isAuthenticated={this.props.token}
					drawerToggleClick={this.sideDrawerToggleHandler}/>
				<SideDrawer 
					open={this.state.showSideDrawer}
					closed={this.sideDrawerCloseHandler} />
				<main className={classes.Content}>
					{this.props.children}
				</main>
			</Aux>
		)
	}
}

const mapStateToProps = state => {
	return{
		token: state.auth.token !== null
	}
}

export default connect(mapStateToProps, null)(Layout);