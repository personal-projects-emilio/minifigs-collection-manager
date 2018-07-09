import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './MinifigsMenu.css';
import * as actions from '../../store/actions/index';
import LinearProgress from 'material-ui/LinearProgress';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';

class MinifigsMenu extends Component {
	// The number per page is set at 100 by default in the redux reducer, if you remove 100 from the state change the reducer accordingly
	state= {
		numberPerPageChoices : [25,50,100,200]
	}

	handlerNumberPerPage = (numberPerPage) => {
		this.props.setNumberPerPage(numberPerPage);
	}

	render () {
		// We calculate and round to 2 decimal the percentage of minifigs owned
		let percentageOwned = null;
		if (this.props.numberOwned & this.props.totalNumber){
			percentageOwned = Math.round((this.props.numberOwned/this.props.totalNumber)*10000)/100;
		}

		// List of button for the choise of numberPerPage
		const buttonNumberPerPage = this.state.numberPerPageChoices.map(number => {
			return <RaisedButton
				key={number}
				label={number}
				style={{margin:6}}
				// If this is the active number it shows a primay button (blue background) with white text
				primary={(number === this.props.numberPerPage) ? true : false}
				labelColor={(number === this.props.numberPerPage) ? "white" : "rgb(0,0,0)"}
				onClick={() => this.props.setNumberPerPage(number)} />
		})

		const spinner = <CircularProgress className={classes.Spinner} size={10} />;

		return (
			<div className={classes.MinifigsMenu}>
				{/*The first part consist of the number of minifig in the database, the one we owned and a LinearProgress with that percetage*/}
				<div className={classes.MinifigsMenuHalf}>
					<p>Number of minifigs in our database:{this.props.totalNumber ? this.props.totalNumber : spinner}</p>
					<p>Number of minifigs you own: {this.props.numberOwned > 0 ? this.props.numberOwned : spinner}</p>
					<div className={classes.Tooltip}>
						<span className={classes.TooltipText}>{percentageOwned}%</span>
						<LinearProgress mode="determinate" value={percentageOwned}/>
					</div>
					<div>
						<span>Set all to:</span>
						<RaisedButton 
							label="Possessed" 
							style={{margin:6}} 
							onClick={() => this.props.setPossessionToAll(true)} />
						<RaisedButton 
							label="Not possessed" 
							style={{margin:6}} 
							onClick={() => this.props.setPossessionToAll(false)} />
					</div>
					
				</div>
				{/*The second part is the button to choose how many minifigs we show*/}
				<div className={classes.MinifigsMenuHalf}>
						<p>Number of minifigs per page</p>
						{buttonNumberPerPage}
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
		setNumberPerPage: (numberPerPage) => dispatch(actions.setNumberPerPage(numberPerPage)),
		setPossessionToAll: (possessed) => dispatch(actions.setPossessionToAll(possessed))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MinifigsMenu);
	