import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/minifigs';

import classes from './Minifig.css';

import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import LogoLink from '../LogoLink/LogoLink';
import Modal from '../UI/Modal/Modal';
import Aux from '../../hoc/Auxilliary/Auxilliary';


class Minifig extends Component {
	state = {
		showModal: false
	}

	// The component only update if its possessed props change or to open the modals
	shouldComponentUpdate (nextProps, nextState) {
		return nextProps.minifigDetail.possessed !== this.props.minifigDetail.possessed || nextState !== this.state;
	}

	showModalHandler = () => {
		this.setState({showModal: true});
	}

	removeModalHandler = () => {
		this.setState({showModal: false});
    }
    
    showByTagHandler = (tag) => {
        this.props.setTag(tag);
    }

	render () {
		let minifigModal = null

        if (this.state.showModal) {
			minifigModal = (
				<Aux>
					<p className={classes.ModalTitle}>{this.props.minifigDetail.name}</p>
					<img className={classes.ModalPicture} src={'http://img.bricklink.com/ItemImage/MN/0/'+this.props.reference+'.png'} alt={this.props.reference + ' pictures'} />
				</Aux>
			);
        }
        let nameAndTags = null;
        if (this.props.minifigDetail.characterName && this.props.minifigDetail.tags) {
            let tags = this.props.minifigDetail.tags.map(tag => {
                return(
                    <button key={tag} type="button" onClick={() => this.showByTagHandler(tag)} >{tag}</button>
                )
            })
            nameAndTags = (
                <Aux>
                    <Divider/>
                    <p>{ this.props.minifigDetail.characterName }</p>
                    <Divider/>
                    <div>{ tags }</div>
                    <Divider/>
                </Aux>
            )
        };
		return (
			<Aux>
				<Modal show={this.state.showModal} modalClosed={this.removeModalHandler}>
					{minifigModal}
				</Modal>
				<div className={classes.Minifig}>
					{/*Picture and reference of the minifig*/}
					<div onClick={this.showModalHandler}>
						<img className={classes.MinifigPicture} src={'http://img.bricklink.com/ItemImage/MN/0/'+this.props.reference+'.png'} alt={this.props.reference + ' pictures'} />
						<span>{this.props.reference}</span>		
					</div>
					<div className={classes.LogoLinks}>
						{/*Bricklink and Brickset logo with links*/}
						<LogoLink minifigRef={this.props.reference} type={'bricklink'} />
						<LogoLink minifigRef={this.props.reference} type={'brickset'} />
					</div>
                    { nameAndTags }
					<Checkbox
						checked={this.props.minifigDetail.possessed}
						label="Owned"
						onCheck={() => this.props.setPossessed(this.props.reference)}
					/>
				</div>
			</Aux>
		);
	}
}

// We get redux state and action
// const mapStateToProps = state => {
// 	return {
// 		minifigs: state.minifigs,
// 		numberPerPage: state.numberPerPage,
// 		activePage: state.activePage,
// 		error: state.error,
// 		show: state.show,
// 		totalNumber: state.totalNumber,
//         numberOwned: state.numberOwned,
//         tagSelected: state.tagSelected,
//         showByTag: state.showByTag
// 	}
// }

const mapDispatchToProps = dispatch => {
	return {
		setTag: (tag) => dispatch(actions.setTag(tag)),
		setPossessed: (minifigRef) => dispatch(actions.setPossessed(minifigRef))
	}
}

export default connect(null, mapDispatchToProps)(Minifig);
	

