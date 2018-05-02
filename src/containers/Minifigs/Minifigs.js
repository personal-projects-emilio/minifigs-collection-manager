import React, {Component} from 'react';
import {connect} from 'react-redux';

import Pagination from "react-js-pagination";
import Aux from '../../hoc/Auxilliary/Auxilliary'
import classes from './Minifigs.css';
import Minifig from '../../components/Minifig/Minifig';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';


class Minifigs extends Component {
	//Initiate the minifigs
	componentDidMount () {
		this.props.onInitMinifigs();
	}
	

	handlePageChange = (pageNumber) => {
		this.props.setActivePage(pageNumber);
	}

	render () {
		// While the minifigs aren't loaded we show a spinner, if we have an error we show a message
		let minifigs = this.props.error ? <p>Minifigs can't be loaded!</p> : <Spinner />;
		let pagination = null;
		// If we have minifigs and the numberPerPage we display them and manage the pagination
		if(this.props.minifigs && this.props.numberPerPage){
			const totalMinifigs = Object.keys(this.props.minifigs).length;
			const begin = ((this.props.activePage-1) * this.props.numberPerPage);
			const end = begin + this.props.numberPerPage;
			const minifigsList = Object.keys(this.props.minifigs).slice(begin, end);

			minifigs = minifigsList.map(minifig => {
				const minifigInfo = {...this.props.minifigs[minifig]};
					return (
						<Minifig
							key={minifig}
							reference={minifig}
							name={minifigInfo.name}
							possessed={minifigInfo.possessed}
							onChange={()=> this.props.setPossessed(minifig)}
						/>
					)

			})
			// react-js-pagination package used, you can check the info on github
			pagination = <Pagination
			    firstPageText='first'
    			lastPageText='last'
				hideDisabled
				linkClassPrev={classes.DisplayNone}
				linkClassNext={classes.DisplayNone}
		    	activePage={this.props.activePage}
		    	itemsCountPerPage={this.props.numberPerPage}
		    	totalItemsCount={totalMinifigs}
		    	onChange={this.handlePageChange}
		    	innerClass={classes.PaginationUl}
		    	activeClass={classes.Active}
			/>

		}

		// We render the minifigs with Pagination top and bottom
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

// We get store state and action from redux with connect
const mapStateToProps = state => {
	return {
		minifigs: state.minifigs,
		numberPerPage: state.numberPerPage,
		activePage: state.activePage,
		error: state.error
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onInitMinifigs: () => dispatch(actions.initMinifigs()),
		setActivePage: (activePage) => dispatch(actions.setActivePage(activePage)),
		setPossessed: (minifigRef) => dispatch(actions.setPossessed(minifigRef))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Minifigs);


