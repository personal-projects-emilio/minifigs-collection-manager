import React, {Component} from 'react';
import {connect} from 'react-redux';

import Pagination from "react-js-pagination";
import classes from './Minifigs.css';
import Minifig from '../Minifig/Minifig';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as actions from '../../store/actions/minifigs';
import MinifigsMenu from '../MinifigsMenu/MinifigsMenu';

class Minifigs extends Component {
    componentDidMount () {
        //Initiate the minifigs and the frames
        if(!this.props.minifigs){
            this.props.onInitMinifigs();
            this.props.onInitFrames();
        }
        const search = this.props.history.location.search;
        if (!search) {
            this.props.setTag(null);
            this.props.setCharac(null);
        }
        const param = search.split("=")[0].replace("?", "");
        const value = decodeURIComponent(search.split("=")[1]) ;
        if (param === "tag") { //if we have a tag in our location.search we set it in redux
            this.props.setTag(value);
        } 
        if (param === "characterName") { // if we have a charac in our location.search we set it in redux
            this.props.setCharac(value); 
        }
    }
	
	handlePageChange = (pageNumber) => {
		this.props.setActivePage(pageNumber);
	}

	render () {
		// While the minifigs aren't loaded we show a spinner, if we have an error we show a message
		let minifigs = this.props.error ? <p>Minifigs can't be loaded!</p> : <CircularProgress className={classes.Spinner} size={200} thickness={1.5} />;
		let pagination = null;
		// If we have minifigs and the numberPerPage we display them and manage the pagination
		if(this.props.minifigs && this.props.numberPerPage){
			// The begin and the end of the active page
			const begin = ((this.props.activePage-1) * this.props.numberPerPage);
			const end = begin + this.props.numberPerPage;
			
			// The list of minifigs we are showing
			let minifigListObject = {}; // Our new empty object
			Object.keys(this.props.minifigs).forEach(minifig => {
                const possession = this.props.minifigs[minifig].possessed;
                // First we check the possession
                if ((this.props.show === "all") 
					|| (this.props.show === "owned" && possession)
					|| (this.props.show === "missing" && !possession)){
                        // Then we check if we have a tag selected
                        if (this.props.tagSelected){
                            const tags = this.props.minifigs[minifig].tags;
                            for (const i in tags){
                                if (tags[i] === this.props.tagSelected ){
                                    minifigListObject[minifig] = minifig;
                                }
                            }
                        // And if we have a character name selected
                        } else if(this.props.characSelected) {
                            const name = this.props.minifigs[minifig].characterName;
                            if (name === this.props.characSelected ){
                                minifigListObject[minifig] = minifig;
                            }
                        } else {minifigListObject[minifig] = minifig;}
					
				} 
			})
			// The number of minifigs we are showing for the pagination
			const totalItemsCount = Object.keys(minifigListObject).length;
			// We manage the active page if it does change
			const numberOfPage = Math.ceil(totalItemsCount/this.props.numberPerPage);
			if ( numberOfPage < this.props.activePage && numberOfPage > 0) {
				this.props.setActivePage(numberOfPage);
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
			<div className={classes.Minifig}>
                <MinifigsMenu />
				<div className={classes.Pagination}>
					{pagination}
				</div>
				<div className={classes.MinifigsList}>
					{minifigs}
				</div>
				<div className={classes.Pagination}>
					{pagination}
				</div>
			</div>
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
        showByTag: state.showByTag,
        characNames: state.characNames,
        characSelected: state.characSelected
	}
}

const mapDispatchToProps = dispatch => {
	return {
        onInitMinifigs: () => dispatch(actions.initMinifigs()),
        onInitFrames: () => dispatch(actions.initFrames()),
        setActivePage: (activePage) => dispatch(actions.setActivePage(activePage)),
        setTag: (tag) => dispatch(actions.setTag(tag)),
        setCharac: (characSelected) => dispatch(actions.setCharac(characSelected))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Minifigs);


