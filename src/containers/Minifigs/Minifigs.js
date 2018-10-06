import React, {Component} from 'react';
import {connect} from 'react-redux';

import Pagination from "react-js-pagination";
import Aux from '../../hoc/Auxilliary/Auxilliary'
import classes from './Minifigs.css';
import Minifig from '../../components/Minifig/Minifig';
import CircularProgress from 'material-ui/CircularProgress';
import * as actions from '../../store/actions/minifigs';


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
		let minifigs = this.props.error ? <p>Minifigs can't be loaded!</p> : <CircularProgress className={classes.Spinner} size={200}  />;
		let pagination = null;
		// If we have minifigs and the numberPerPage we display them and manage the pagination
		if(this.props.minifigs && this.props.numberPerPage){
			// The begin and the end of the active page
			const begin = ((this.props.activePage-1) * this.props.numberPerPage);
			const end = begin + this.props.numberPerPage;
			
			// The complete list of minifigs we are showing
			let minifigListObject = {}; // Our new empty object
			Object.keys(this.props.minifigs).forEach(minifig => {
                const possession = this.props.minifigs[minifig].possessed;
                // First we check the possession
                if ((this.props.show === "all") 
					|| (this.props.show === "owned" && possession)
					|| (this.props.show === "missing" && !possession)){
                        // Then we check if we have a tag selected
                        if (this.props.showByTag && this.props.tagSelected){
                            const tags = this.props.minifigs[minifig].tags;
                            for (const i in tags){
                                if (tags[i] === this.props.tagSelected ){
                                    minifigListObject[minifig] = minifig;
                                }
                            }
                        } else {minifigListObject[minifig] = minifig;}
					
				} 
			})
			// The number of minifigs we are showing for the pagination
			const totalItemsCount = Object.keys(minifigListObject).length;
			// We manage the active page if it does change
			const numberOfPage = Math.ceil(totalItemsCount/this.props.numberPerPage);
			if ( numberOfPage < this.props.activePage && numberOfPage > 0) {
				this.handlePageChange(numberOfPage);
			}
			// The minifigs that we are showing on our active page 
			const minifigsList = Object.keys(minifigListObject).slice(begin, end);

			// We map our list to show each minifig on the page
			minifigs = minifigsList.map(minifig => {
				const minifigDetail = {...this.props.minifigs[minifig]};
				return (
					<Minifig
						key={minifig}
						reference={minifig}
                        minifigDetail={minifigDetail}
						//onChange={()=> this.props.setPossessed(minifig)}
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
		    	totalItemsCount={totalItemsCount}
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

// We get redux state and action
const mapStateToProps = state => {
	return {
		minifigs: state.minifigs,
		numberPerPage: state.numberPerPage,
		activePage: state.activePage,
		error: state.error,
		show: state.show,
		totalNumber: state.totalNumber,
        numberOwned: state.numberOwned,
        tagSelected: state.tagSelected,
        showByTag: state.showByTag
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onInitMinifigs: () => dispatch(actions.initMinifigs()),
		setActivePage: (activePage) => dispatch(actions.setActivePage(activePage))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Minifigs);


