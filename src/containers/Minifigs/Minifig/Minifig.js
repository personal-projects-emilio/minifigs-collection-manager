import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import classes from './Minifig.css';

import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import LogoLink from '../../../components/LogoLink/LogoLink';
import Modal from '../../../components/UI/Modal/Modal';
import MinifigForm from '../MinifigForm/MinifigForm';
import NameAndTags from './NameAndTags/NameAndTags';


class Minifig extends Component {
	state = {
        zoomMode: false,
        editMode: false
	}

	zoomModeHandler = () => {
		this.setState({zoomMode: true});
	}

	removeModalHandler = () => {
		this.setState({zoomMode: false, editMode: false});
    }

    editModeHandler = () => {
        this.setState({editMode: true});
    }

	render () {
        const minifigRef = this.props.reference;
        const minifigDetail = this.props.minifigDetail;
		let zoomModal = null
        let editModal = null;
        if (this.state.zoomMode) {
			zoomModal = (
				<React.Fragment>
					<p className={classes.ModalTitle}>{minifigDetail.name}</p>
					<img className={classes.ModalPicture}
                         src={'https://img.bricklink.com/ItemImage/MN/0/'+minifigRef+'.png'}
                         alt={minifigRef + ' picture'} />
				</React.Fragment>
			);
        }

        if (this.state.editMode) {
            editModal = (
                <MinifigForm edit minifigRef={minifigRef} minifig={minifigDetail} onSubmit={this.removeModalHandler}/>
            )
        }
        let nameAndTags = null;
        if (minifigDetail.characterName && minifigDetail.tags) {
            nameAndTags = <NameAndTags characterName={minifigDetail.characterName} tags={minifigDetail.tags} />
        };
		return (
			<React.Fragment>
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
						<img className={classes.MinifigPicture}
                             src={'https://img.bricklink.com/ItemImage/MN/0/'+minifigRef+'.png'}
                             alt={minifigRef + ' picture'} />
						<p>{minifigRef}</p>
					</div>
					<div className={classes.LogoLinks}>
						{/*Bricklink and Brickset logo with links*/}
						<LogoLink minifigRef={minifigRef} type={'bricklink'} />
						<LogoLink minifigRef={minifigRef} type={'brickset'} />
					</div>
                    { nameAndTags }
                    <div className={classes.EditDiv}>
                        <Checkbox
                            // The !! is important for an error when we delete a minifig and the possessed is undefined
                            checked={!!minifigDetail.possessed}
                            color="primary"
                            onChange={() => this.props.setPossessed(minifigDetail, minifigRef)}/>
                        <IconButton color="primary" onClick={this.editModeHandler}>
                            <Icon>edit</Icon>
                        </IconButton>
                        <IconButton color="primary" onClick={() => this.props.deleteMinifig(minifigRef)}>
                            <Icon>delete</Icon>
                        </IconButton>
                    </div>
				</div>
			</React.Fragment>
		);
	}
}


const mapDispatchToProps = dispatch => ({
    setPossessed: (minifig, minifigRef) => dispatch(actions.setPossessed(minifig, minifigRef)),
    deleteMinifig: (minifigRef) => dispatch(actions.deleteMinifig(minifigRef))
})

export default connect(null, mapDispatchToProps)(Minifig);

