import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/minifigs';
import classes from './Minifig.css';

import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import LogoLink from '../../../components/LogoLink/LogoLink';
import Modal from '../../../components/UI/Modal/Modal';
import Aux from '../../../hoc/Auxilliary/Auxilliary';
import MinifigForm from '../MinifigForm/MinifigForm';
import NameAndTags from '../NameAndTags/NameAndTags';


class Minifig extends Component {
	state = {
        zoomMode: false,
        editMode: false
	}

	// The component only update if its possessed props change or to open the modals
	shouldComponentUpdate (nextProps, nextState) {
		return nextProps.minifigDetail.possessed !== this.props.minifigDetail.possessed || nextState !== this.state;
	}

	zoomModeHandler = () => {
		this.setState({zoomMode: true});
	}

	removeModalHandler = () => {
		this.setState({zoomMode: false, editMode: false});
    }

    editModeHandler = () => {
        this.setState({editMode: true})
    }

	render () {
        const ref = this.props.reference;
        const minifigDetail = this.props.minifigDetail;
		let zoomModal = null
        let editModal = null;
        if (this.state.zoomMode) {
			zoomModal = (
				<Aux>
					<p className={classes.ModalTitle}>{minifigDetail.name}</p>
					<img className={classes.ModalPicture} src={'https://img.bricklink.com/ItemImage/MN/0/'+ref+'.png'} alt={ref + ' pictures'} />
				</Aux>
			);
        }

        if (this.state.editMode) {
            // We are using JSON.stringify in MinifigForm so the order of the properties is important!
            const minifig = {
                ref: ref,
                ...minifigDetail
            }
            editModal = (
                <MinifigForm edit minifig={minifig} onSubmit={this.removeModalHandler}/>
            )
        }
        let nameAndTags = null;
        if (minifigDetail.characterName && minifigDetail.tags) {
            nameAndTags = <NameAndTags characterName={minifigDetail.characterName} tags={minifigDetail.tags} />
        };
		return (
			<Aux>
                {/* The zomm modal */}
				<Modal show={this.state.zoomMode} modalClosed={this.removeModalHandler}>
					{zoomModal}
				</Modal>
                {/* The edit modal */}
                <Modal show={this.state.editMode} modalClosed={this.removeModalHandler}>
                    {editModal}
                </Modal>
				<div className={classes.Minifig}>
					{/*Picture and reference of the minifig*/}
					<div onClick={this.zoomModeHandler}>
						<img className={classes.MinifigPicture} src={'https://img.bricklink.com/ItemImage/MN/0/'+ref+'.png'} alt={ref + ' pictures'} />
						<p>{ref}</p>		
					</div>
					<div className={classes.LogoLinks}>
						{/*Bricklink and Brickset logo with links*/}
						<LogoLink minifigRef={ref} type={'bricklink'} />
						<LogoLink minifigRef={ref} type={'brickset'} />
					</div>
                    { nameAndTags }
                    <div className={classes.EditDiv}>
                        <Checkbox
                            checked={minifigDetail.possessed}
                            color="primary"
                            onChange={() => this.props.setPossessed(ref)}/>
                        <IconButton color="primary" onClick={this.editModeHandler}>
                            <Icon>edit</Icon>    
                        </IconButton>
                        
                    </div>
				</div>
			</Aux>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
        setPossessed: (minifigRef) => dispatch(actions.setPossessed(minifigRef))
	}
}

//export default connect(null, mapDispatchToProps)(Minifig);
export default connect(null, mapDispatchToProps)(Minifig);
	

