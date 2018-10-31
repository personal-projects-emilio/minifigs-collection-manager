import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../store/actions/minifigs';
import classes from './MinifigsMenu.css';

import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Dropdown from '../../components/Dropdown/Dropdown';
import Modal from '../../components/UI/Modal/Modal';
import MinifigForm from '../Minifigs/MinifigForm/MinifigForm';

class MinifigsMenu extends Component {
	// The number per page is set at 100 by default in the redux reducer, if you remove 100 from the state change the reducer accordingly
	state = {
        numberPerPageChoices : [25,50,100,200],
        showOptions: ["All", "Owned", "Missing"],
        showModal: false
	}

	handlerNumberPerPage = (numberPerPage) => {
		this.props.setNumberPerPage(numberPerPage);
    }
    
    handlerTagChange = (_event, _index, value) => {
        this.props.setTag(value);
        const search = value ? "?tag="+encodeURIComponent(value) : null;
        this.props.history.push({
            pathname: "/",
            search: search
        });  
    }

    handlerCharacChange = (_event, _index, value) => {
        this.props.setCharac(value);
        const search =  value? "?characterName="+encodeURIComponent(value) : null;
        this.props.history.push({
            pathname: "/",
            search: search
        }); 
    }

    toggleModalHandler = () => {
        this.setState({showModal: !this.state.showModal})
    }


	render () {
		// List of button for the choise of numberPerPage
		const buttonNumberPerPage = this.state.numberPerPageChoices.map(number => {
			return <Button
				key={number}
                variant="contained"
				style={{margin:6}}
				color={(number === this.props.numberPerPage) ? "primary" : "default"}
				onClick={() => this.props.setNumberPerPage(number)} >{number}</Button>
        })
        
        // List of Button for the show options
        const showOptions = this.state.showOptions.map(option => {
            return(
                <Button key={option}
                        variant="contained"
                        onClick={() => this.props.setShow(option.toLowerCase())} 
                        color={this.props.show === option.toLowerCase() ? "primary" : "default"}
                        style={{margin:6}}>{option} </Button>
            )
        })

		const spinner = <CircularProgress className={classes.Spinner} size={10} />;
        
        // Modal for adding a minifig
        const modal = (
            <MinifigForm minifig={null} edit={false} onSubmit={this.toggleModalHandler}/>
        )

		return (
            
			<div className={classes.MinifigsMenu}>
                <Modal show={this.state.showModal} modalClosed={this.toggleModalHandler}>
                        {modal}
                </Modal>
				{/*The first part consist of the number of minifig in the database, the one we owned and a LinearProgress with that percetage*/}
				<div className={classes.MinifigsMenuHalf}>
					<div className={classes.MinifigMenuText}>Minifigs in our database:{this.props.totalNumber ? this.props.totalNumber : spinner}</div>
					<div className={classes.MinifigMenuText}>Mnifigs you own: {this.props.numberOwned !== null ? this.props.numberOwned : spinner}</div>
					<div className={classes.Tooltip}>
						<span className={classes.TooltipText}>{this.props.percentageOwned}%</span>
						<LinearProgress variant="determinate" value={this.props.percentageOwned}/>
					</div>
					<div>
						<span>Set all to:</span>
						<Button 
							style={{margin:6}} 
							onClick={() => this.props.setPossessionToAll(true)} 
                            color={this.props.percentageOwned === 100 ? "primary": "default"}
                            variant="contained">Possessed</Button>
						<Button 
							label="Not possessed" 
							style={{margin:6}}
                            color={this.props.percentageOwned === 0 ? "primary": "default"}
							onClick={() => this.props.setPossessionToAll(false)} 
                            variant="contained">Not possessed</Button>
					</div>
					<div>
						<span>Show:</span> {showOptions}
					</div>
				</div>
				{/*The second part is the button to choose how many minifigs we show*/}
				<div className={classes.MinifigsMenuHalf}>
					<div>
                    	<p>Minifigs per page</p>
						{buttonNumberPerPage}
                    </div>
                    <div>
                        <Dropdown type="Tags" array={this.props.tags} handler={this.handlerTagChange} itemSelected={this.props.tagSelected} />
                        <Dropdown type="Characters Name" array={this.props.characNames} handler={this.handlerCharacChange} itemSelected={this.props.characSelected}/>
                    </div>
                    <Button color="primary"
							style={{margin:6}} 
							onClick={() => this.toggleModalHandler()}
                            variant="contained">Add a minifig<Icon className={classes.Icon}>add_circle</Icon></Button>
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
        percentageOwned: state.percentageOwned,
		numberPerPage: state.numberPerPage,
		error: state.error,
        show: state.show,
        tagSelected: state.tagSelected,
        tags: state.tags,
        characNames: state.characNames,
        characSelected: state.characSelected
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setNumberPerPage: (numberPerPage) => dispatch(actions.setNumberPerPage(numberPerPage)),
		setPossessionToAll: (possessed) => dispatch(actions.setPossessionToAll(possessed)),
        setShow: (show) => dispatch(actions.setShow(show)),
        setTag: (tag) => dispatch(actions.setTag(tag)),
        setCharac: (charac) => dispatch(actions.setCharac(charac))
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MinifigsMenu));
	