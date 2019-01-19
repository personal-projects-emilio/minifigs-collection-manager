import React, {Component} from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { push } from 'react-router-redux';
import * as actions from '../../../../store/actions';
import classes from './NameAndTags.css';

import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';


class NameAndTags extends Component {
    // Handler to set the tag and the search
    showByTagHandler = (tag) => {
        if (this.props.tagSelected !== tag) {
            this.props.setTag(tag);
            const search = "?tag="+encodeURIComponent(tag);
            this.props.history.push({
                pathname: "/",
                search: search
            })
        }         
    }

    // Handler to set the character name and the search
    shoByCharacHandler = (charac) => {
        if (this.props.characSelected !== charac) {
            this.props.setCharac(charac);
            const search = "?characterName="+encodeURIComponent(charac);
            this.props.history.push({
                pathname: "/",
                search: search
            })
        }
    }

    render() {
        let nameAndTags = null;
        if (this.props.characterName && this.props.tags) {
            let tags = null;
            if (this.props.tags.length) {
                tags = this.props.tags.map(tag => (
                    <Button className={classes.Button}
                            classes={{disabled: classes.Disabled}}
                            disabled={this.props.tagSelected === tag}
                            onClick={() => this.showByTagHandler(tag)}
                            variant="contained"
                            key={tag}>
                        {tag}
                    </Button>
                ))
            }
            
            nameAndTags = (
                <React.Fragment>
                    <Divider/>
                    <div className={classes.Div}>
                        <Button className={classes.Button}
                                classes={{disabled: classes.Disabled}}
                                disabled={this.props.characSelected === this.props.characterName}
                                onClick={() => this.shoByCharacHandler(this.props.characterName)}
                                variant="contained">
                            {this.props.characterName}
                        </Button>
                    </div>
                    {/* If we have tags we render them */}
                    {tags ? (
                        <React.Fragment>
                            <Divider/>
                            <div className={classes.Div}>{ tags }</div>
                        </React.Fragment>
                    ) : null}
                    <Divider/>
                </React.Fragment>
            )
        };
        return <React.Fragment>{nameAndTags}</React.Fragment>
    }
}

// We get store state and action from redux with connect
const mapStateToProps = state => ({
    tagSelected: state.minifigs.tagSelected,
    characSelected: state.minifigs.characSelected
})

const mapDispatchToProps = dispatch => ({
    setTag: tag => dispatch(actions.setTag(tag)),
    setCharac: characSelected => dispatch(actions.setCharac(characSelected)),
    push: path => dispatch(push(path))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NameAndTags));