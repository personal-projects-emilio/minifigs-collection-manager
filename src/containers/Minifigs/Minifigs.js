import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './Minifigs.css';
import Minifig from '../../components/Minifig/Minifig';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';


class Minifigs extends Component {
	// We'll get a complet list in a database with redux and axios later on
	state = {
		numberPerPage: 100,
		activePage: 1,
		numberOfPages: null
	}

	//Initiate the minifigs
	componentDidMount () {
		this.props.onInitMinifigs();
	}

	handlePageChange(pageNumber) {
	    this.setState({activePage: pageNumber});
	}

	handleNumberOfPages(numberOfPages){
		this.setState({numberOfPages: numberOfPages});
	}

	render () {
		// While the minifigs aren't loaded we show a spinner, if we have an error we show a message
		let minifigs = this.props.error ? <p>Minifigs can't be loaded!</p> : <Spinner />;

		// If we hve minifigs we display them
		if(this.props.minifigs){
			const numberOfPages = Math.ceil((Object.keys(this.props.minifigs).length) / this.state.numberPerPage);
			handleNumberOfPages(numberOfPages);
			const begin = ((this.state.activePage-1) * this.state.numberPerPage);
			const end = begin + this.state.numberPerPage;
			const minifigsList = Object.keys(this.props.minifigs).slice(begin, end);

			minifigs = minifigsList.map(minifig => {
				const minifigInfo = {...this.props.minifigs[minifig]};
					return (
						<Minifig
							key={minifig}
							reference={minifig}
							name={minifigInfo.name}
							possesed={minifigInfo.possesed}
						/>
					);
			})
		}

		return (
			<div className={classes.Minifigs}>
				{minifigs}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		minifigs: state.minifigs,
		error: state.error
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onInitMinifigs: () => dispatch(actions.initMinifigs())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Minifigs);


