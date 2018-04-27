import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './MinifigsMenu.css';
import * as actions from '../../store/actions/index';
import LinearProgress from 'material-ui/LinearProgress';
import RaisedButton from 'material-ui/RaisedButton';

class MinifigsMenu extends Component {
	state= {
		numberPerPageChoice : [25,50,100,200]
	}

	handlerNumberPerPage = (numberPerPage) => {
		this.props.setNumberPerPage(numberPerPage);
	}

	render () {
		let percentageOwned = null;
		if (this.props.numberOwned & this.props.totalNumber){
			percentageOwned = (this.props.numberOwned/this.props.totalNumber)*100;
		}
		const buttonNumberPerPage = this.state.numberPerPageChoice.map(number => {
			return (
				<RaisedButton
					key={number}
					style={{margin:6}}
					primary={(number === this.props.numberPerPage) ? true : false}
					onClick={() => this.props.setNumberPerPage(number)}>
					{number}
				</RaisedButton>
			)
		})
		return (
			<div className={classes.MinifigsMenu}>
				<div className={classes.MinifigsMenuHalf}>
					<p>Number of minifigs in our database:{this.props.totalNumber ? this.props.totalNumber : null}</p>
					<p>Number of minifigs you own: {this.props.numberOwned ? this.props.numberOwned : null}</p>
					<LinearProgress mode="determinate" value={percentageOwned}/>
				</div>
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
	