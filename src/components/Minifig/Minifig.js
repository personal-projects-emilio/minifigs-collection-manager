import React, {Component} from 'react';

import classes from './Minifig.css';
import LogoLink from '../LogoLink/LogoLink';
import Checkbox from 'material-ui/Checkbox';
import Modal from '../UI/Modal/Modal';
import Aux from '../../hoc/Auxilliary/Auxilliary';


class Minifig extends Component {
	state = {
		showModal: false
	}

	// The component only update if his possessed props change or to open the modals
	shouldComponentUpdate (nextProps, nextState) {
		return nextProps.possessed !== this.props.possessed || nextState !== this.state;
	}

	showModalHandler = () => {
		this.setState({showModal: true});
	}

	removeModalHandler = () => {
		this.setState({showModal: false});
	}

	render () {
		let minifigModal = null

		if (this.state.showModal) {
			minifigModal = (
				<Aux>
					<p className={classes.ModalTitle}>{this.props.name}</p>
					<img className={classes.ModalPicture} src={'http://img.bricklink.com/ItemImage/MN/0/'+this.props.reference+'.png'} alt={this.props.reference + ' pictures'} />
				</Aux>
			);
		}
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
					<Checkbox
						checked={this.props.possessed}
						label="Owned"
						onCheck={() => this.props.onChange()}
					/>
				</div>
			</Aux>
		);
	}
}

export default Minifig;
	

