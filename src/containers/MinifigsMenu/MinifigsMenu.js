import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './MinifigsMenu.css';
import * as actions from '../../store/actions/index';
import LinearProgress from 'material-ui/LinearProgress';
import RaisedButton from 'material-ui/RaisedButton';

class MinifigsMenu extends Component {
	// The number per page is set at 100 by default in the redux reducer, if you remove 100 from the state change the reducer accordingly
	state= {
		numberPerPageChoice : [25,50,100,200]
	}

	handlerNumberPerPage = (numberPerPage) => {
		this.props.setNumberPerPage(numberPerPage);
	}

	render () {
		// We calculate the percetage of minifigs owned
		let percentageOwned = null;
		if (this.props.numberOwned & this.props.totalNumber){
			percentageOwned = (this.props.numberOwned/this.props.totalNumber)*100;
		}

		// List of button for the choise of numberPerPage
		const buttonNumberPerPage = this.state.numberPerPageChoice.map(number => {
			return <RaisedButton
				key={number}
				label={number}
				style={{margin:6}}
				// If this is the active number it shows a primay button (blue background) with white text
				primary={(number === this.props.numberPerPage) ? true : false}
				labelColor={(number === this.props.numberPerPage) ? "white" : "black"}
				onClick={() => this.props.setNumberPerPage(number)} />
		})


		return (
			<div className={classes.MinifigsMenu}>
				{/*The first part consist of the number of minifig in the database, the one we owned and a LinearProgress with that percetage*/}
				<div className={classes.MinifigsMenuHalf}>
					<p>Number of minifigs in our database:{this.props.totalNumber ? this.props.totalNumber : null}</p>
					<p>Number of minifigs you own: {this.props.numberOwned ? this.props.numberOwned : null}</p>
					<LinearProgress mode="determinate" value={percentageOwned}/>
				</div>
				{/*The second part is the button to choose how many minifigs we show*/}
				<div className={classes.MinifigsMenuHalf}>
					<div className={classes.NumberPerPage}>
						<p>Number of minifigs per page</p>
						{buttonNumberPerPage}
					</div>
				</div>
			</div>
		);
	}
}

// We get store state and action from redux with connect
const mapStateToProps = state => {
	return {
		numberOwned: state.numberOwned,
		totalNumber: state.totalNumber,
		numberPerPage: state.numberPerPage,
		error: state.error
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setNumberPerPage: (numberPerPage) => dispatch(actions.setNumberPerPage(numberPerPage))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MinifigsMenu);
	