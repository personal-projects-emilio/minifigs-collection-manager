import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './MinifigsMenu.css';
import * as actions from '../../store/actions/minifigs';
import LinearProgress from 'material-ui/LinearProgress';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
//import { DropDownMenu } from 'material-ui';

class MinifigsMenu extends Component {
	// The number per page is set at 100 by default in the redux reducer, if you remove 100 from the state change the reducer accordingly
	state = {
        numberPerPageChoices : [25,50,100,200],
        showOptions: ["All", "Owned", "Missing"]
	}

	handlerNumberPerPage = (numberPerPage) => {
		this.props.setNumberPerPage(numberPerPage);
    }
    
    handlerTagChange = (_event, _index, value) => {
        this.props.setTag(value);
    }

	render () {
		// We calculate and round to 2 decimal the percentage of minifigs owned
		let percentageOwned = null;
		if (this.props.numberOwned && this.props.totalNumber){
			percentageOwned = Math.round((this.props.numberOwned/this.props.totalNumber)*10000)/100;
        } else { percentageOwned = 0 }

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
        
        // List of Button for the show options
        const showOptions = this.state.showOptions.map(option => {
            return(
                <RaisedButton label={option}
                              key={option}
                              style={{margin:6}}
                              primary={(this.props.show === option.toLowerCase()) ? true : false}
                              labelColor={(this.props.show === option.toLowerCase()) ? "white": "rgb(0,0,0)"}
                              onClick={() => this.props.setShow(option.toLowerCase())} />
            )
        })

        // List of tags
        let tags = [<MenuItem value={null} key="null" primaryText={""}/>];
        if (this.props.tags) {
            this.props.tags.forEach(tag => {
                tags.push(<MenuItem value={tag} key={tag} primaryText={tag}/>)
            })
        }
        const tagsDropDow = (
            <SelectField value={this.props.tag} 
                         floatingLabelText="Tags"
                         onChange={this.handlerTagChange}>
                {tags}
            </SelectField>
        )

		const spinner = <CircularProgress className={classes.Spinner} size={10} />;

		return (
			<div className={classes.MinifigsMenu}>
				{/*The first part consist of the number of minifig in the database, the one we owned and a LinearProgress with that percetage*/}
				<div className={classes.MinifigsMenuHalf}>
					<div className={classes.MinifigMenuText}>Number of minifigs in our database:{this.props.totalNumber ? this.props.totalNumber : spinner}</div>
					<div className={classes.MinifigMenuText}>Number of minifigs you own: {this.props.numberOwned !== null ? this.props.numberOwned : spinner}</div>
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
					<div>
						<span>Show:</span> {showOptions}
					</div>
				</div>
				{/*The second part is the button to choose how many minifigs we show*/}
				<div className={classes.MinifigsMenuHalf}>
					<div>
                    	<p>Number of minifigs per page</p>
						{buttonNumberPerPage}
                    </div>
                    <div>
                        {tagsDropDow}
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
		error: state.error,
        show: state.show,
        tagSelected: state.tagSelected,
        showByTag: state.showByTag,
        tags: state.tags,
        tag: state.tagSelected
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setNumberPerPage: (numberPerPage) => dispatch(actions.setNumberPerPage(numberPerPage)),
		setPossessionToAll: (possessed) => dispatch(actions.setPossessionToAll(possessed)),
        setShow: (show) => dispatch(actions.setShow(show)),
        setTag: (tag) => dispatch(actions.setTag(tag))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MinifigsMenu);
	