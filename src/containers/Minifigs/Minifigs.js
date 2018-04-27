import React, {Component} from 'react';
import {connect} from 'react-redux';

import Pagination from "react-js-pagination";
import Aux from '../../hoc/Auxilliary/Auxilliary'
import classes from './Minifigs.css';
import Minifig from '../../components/Minifig/Minifig';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';


class Minifigs extends Component {
	// We'll get a complet list in a database with redux and axios later on
	state = {
		activePage: 1
		}

	//Initiate the minifigs
	componentDidMount () {
		this.props.onInitMinifigs();
	}
	
	componentDidUpdate(){
		
	}

	handlePageChange = (pageNumber) => {
	    this.setState({activePage: pageNumber});
	}

	render () {
		// While the minifigs aren't loaded we show a spinner, if we have an error we show a message
		let minifigs = this.props.error ? <p>Minifigs can't be loaded!</p> : <Spinner />;
		let pagination = null;
		// If we have minifigs we display them and manage the pagination
		if(this.props.minifigs && this.props.numberPerPage){
			const totalMinifigs = Object.keys(this.props.minifigs).length;
			const begin = ((this.state.activePage-1) * this.props.numberPerPage);
			const end = begin + this.props.numberPerPage;
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
					)

			})
			pagination = <Pagination
				hideDisabled
		    	activePage={this.state.activePage}
		    	itemsCountPerPage={this.props.numberPerPage}
		    	totalItemsCount={totalMinifigs}
		    	onChange={this.handlePageChange}
			/>

		}

		return (
			<Aux>
				<div className={classes.Pagination}>
					{pagination}
				</div>
				<div className={classes.Minifigs}>
					{minifigs}
				</div>
				<div className={classes.Pagination}>
					{pagination}
				</div>
			</Aux>
		);
	}
}

const mapStateToProps = state => {
	return {
		minifigs: state.minifigs,
		numberPerPage: state.numberPerPage,
		error: state.error
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onInitMinifigs: () => dispatch(actions.initMinifigs())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Minifigs);


