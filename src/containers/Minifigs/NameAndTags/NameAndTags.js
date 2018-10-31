import React, {Component} from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as actions from '../../../store/actions/minifigs';
import classes from './NameAndTags.css';

import Divider from '@material-ui/core/Divider';
import Aux from '../../../hoc/Auxilliary/Auxilliary';
import Button from '@material-ui/core/Button';


class NameAndTags extends Component {
    showByTagHandler = (tag) => {
        this.props.setTag(tag);
        const search = "?tag="+encodeURIComponent(tag);
        this.props.history.push({
            pathname: "/",
            search: search
        });
             
    }

    shoByCharacHandler = (charac) => {
        if (this.props.characSelected !== charac) {
            console.log("Charac set in nameandTags");
            this.props.setCharac(charac);
            const search = "?characterName="+encodeURIComponent(charac);
            this.props.history.push({
                pathname: "/",
                search: search
            });    
        }
    }
    render() {
        let nameAndTags = null;
        if (this.props.characterName && this.props.tags) {
            let tags = null;
            if (this.props.tags) {
                tags = this.props.tags.map(tag => {
                    return(
                        <Button className={classes.Button}
                                onClick={() => this.showByTagHandler(tag)}
                                variant="contained"
                                key={tag}>
                            {tag}
                        </Button>
                    )
                })  
            }
            
            nameAndTags = (
                <Aux>
                    <Divider/>
                    <div className={classes.Div}>
                        <Button className={classes.Button} 
                        //size="small" 
                        onClick={() => this.shoByCharacHandler(this.props.characterName)}
                        variant="contained">
                            {this.props.characterName}
                        </Button>
                    </div>
                    {/* If we have tags we render them */}
                    {tags ? (
                        <Aux>
                            <Divider/>
                            <div className={classes.Div}>{ tags }</div>
                        </Aux>
                    ) : null}
                    <Divider/>
                </Aux>
            )
        };
        return <Aux>{nameAndTags}</Aux>
    }
}

// We get store state and action from redux with connect
const mapStateToProps = state => {
	return {
        tagSelected: state.tagSelected,
        characSelected: state.characSelected
	}
}

const mapDispatchToProps = dispatch => {
    return {
        setTag: (tag) => dispatch(actions.setTag(tag)),
        setCharac: (characSelected) => dispatch(actions.setCharac(characSelected))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NameAndTags));